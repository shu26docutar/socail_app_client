import React from 'react'
import { Typography, Card, CardMedia } from '@mui/material'
import { Link } from 'react-router-dom';

const Scream = (props) => {

  const styles = {
    card: {
      display: 'flex',
      marginBottom: 20,
    },
    image: {
      minWidth: 200,
    },
    content: {
      padding: 25,
      objectFit: 'cover'
    }
  }

  const { children,
          scream: {
              body,
              createdAt,
              commentCount,
              likeCount,
              screamId,
              userHandle,
              userImage
          }
  } = props

  // Failed prop type: MUI: Either `children`, `image`, `src` or `component` prop must be specified.
  // https://atsu-developer.net/270/

  return (
    <div>
      <Card style={styles.card}>
        <CardMedia
          style={styles.image}
          image={userImage}
          title="Profile Image" />
        
        <CardContent style={styles.content}>
          <Typography variant='h5' component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
          <Typography variant='body2' color='textSecondary'>{createdAt}</Typography>
          <Typography variant='body1'>{body}</Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Scream

// フレキシブルデザインの採用
// 画像の途切れ修正