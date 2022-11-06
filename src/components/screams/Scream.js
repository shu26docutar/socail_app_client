import React from 'react'
import { Typography, Card, CardMedia, CardContent } from '@mui/material'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import MyButton from '../../utillity/MyButton';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton';

const Scream = (props) => {
  dayjs.extend(relativeTime)

  const styles = {
    card: {
      position: 'relative',
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

  const { scream: {
            body,
            createdAt,
            commentCount,
            likeCount,
            screamId,
            userHandle,
            userImage
        },
        user:{authenticated, credentials: { handle }}
  } =  props 

  // https://atsu-developer.net/270/

  const deleteButton = authenticated && userHandle === handle ? (
    <DeleteScream screamId={screamId}/>
  ) : null

  return (
    <div>
      <Card style={styles.card}>
        <CardMedia
          style={styles.image}
          image={userImage}
          title="Profile Image" />
        
        <CardContent style={styles.content}>
          <Typography variant='h5' component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
            {deleteButton}
          <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
          <Typography variant='body1'>{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='primary' />
          </MyButton>
          <span>{commentCount} comments</span>
          <ScreamDialog screamId={screamId} userHandle={userHandle} />
        </CardContent>
      </Card>
    </div>
  )
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(Scream)