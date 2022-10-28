import React from 'react'
import { Typography, Card, CardMedia, CardContent } from '@mui/material'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { likeScream, unlikeScream } from '../redux/actors/dataActions';
import MyButton from '../utillity/MyButton';
import ChatIcon from '@mui/icons-material/Chat';
import { FavoriteBorder } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteScream from './DeleteScream'

const Scream = (props) => {
  const dispatch = useDispatch()
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

  const { children,
          scream: {
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

  const userState = useSelector((state) => state.user)

  // https://atsu-developer.net/270/

  const likedScream = () => {
    if(userState.likes && userState.likes.find((like) => like.screamId === screamId)) {
      return true
    } else return false
  }

  const like = () => {
    dispatch(likeScream(screamId))
  }

  const unlike = () => {
    dispatch(unlikeScream(screamId))
  }

  const likeButton = !authenticated ? (
    <MyButton tip='Like'>
      <Link to='/login'>
        <FavoriteBorder color='primary' />
      </Link>
    </MyButton>
  ) : (
    likedScream() ? (
      <MyButton tip='Undo like' onClick={unlike}>
        <FavoriteIcon color='primary' />
      </MyButton>
    ) : (
      <MyButton tip='Like' onClick={like}>
        <FavoriteBorder color='primary' />
      </MyButton>
    )
  )

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
          {likeButton}
          <span>{likeCount} likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='primary' />
          </MyButton>
          <span>{commentCount} comments</span>
        </CardContent>
      </Card>
    </div>
  )
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = ({
  likeScream,
  unlikeScream
})

export default connect(mapStateToProps, mapActionsToProps)(Scream)