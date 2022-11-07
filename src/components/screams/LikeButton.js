import React from 'react';
import MyButton from '../../utillity/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FavoriteBorder } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { likeScream, unlikeScream } from '../../redux/actors/dataActions';
import { useDispatch, useSelector, connect } from "react-redux";


const LikeButton = (props) => {
    const scream = props
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.user)

    const likedScream = () => {
        if(userState.likes && userState.likes.find((like) => like.screamId === scream.screamId)) {
            return true
        } else return false
    }
    
    const like = () => {
        dispatch(likeScream(scream.screamId))
    }
    
    const unlike = () => {
        dispatch(unlikeScream(scream.screamId))
    }

    const likeButton = !userState.authenticated ? (
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

    return likeButton
}

LikeButton.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = ({
    likeScream,
    unlikeScream
})

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)