import React from 'react'
import { Typography, Card, CardMedia, CardContent } from '@mui/material'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const Scream = (props) => {
  dayjs.extend(relativeTime)

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
          <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
          <Typography variant='body1'>{body}</Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Scream

// フレキシブルデザインの採用
// 画像の途切れ修正