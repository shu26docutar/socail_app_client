import React from 'react'
import { Typography, Card, CardMedia, CardContent } from '@mui/material'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { connect,useDispatch } from 'react-redux';
import PropTypes from 'prop-types'
import MyButton from '../../utillity/MyButton';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton';
import { getUserData } from '../../redux/actors/dataActions';


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

const { scream: {
            body,
            createdAt,
            commentCount,
            likeCount,
            screamId,
            userHandle,
            userImage
        },
        user:{ authenticated, credentials: { handle }}
  } =  props 

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
        
        <CardContent style={ styles.content }>
          <Typography 
            variant='h5'
            color="primary" 
            component={Link}
            to={`/user/${ userHandle }`}
            onClick={() => {dispatch(getUserData(userHandle))}}
          >
            { userHandle }
          </Typography>

            { deleteButton }

          <Typography 
            variant='body2'
            color='textSecondary'
          >
            { dayjs(createdAt).fromNow() }
          </Typography>

          <Typography
            variant='body1'
          >
            { body }
          </Typography>

          <LikeButton screamId={ screamId } />

          <span>{ likeCount } likes</span>

          <MyButton tip='comments'>
            <ChatIcon color='primary' />
          </MyButton>

          <span>{ commentCount } comments</span>

          <ScreamDialog screamId={ screamId } userHandle={ userHandle } />
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

export default connect(mapStateToProps, {getUserData})(Scream)
// https://atsu-developer.net/270/