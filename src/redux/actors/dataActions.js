import { 
    SET_SCREAMS, 
    SET_SCREAM, 
    LOADING_DATA, 
    LIKE_SCREAM, 
    UNLIKE_SCREAM, 
    DELETE_SCREAM, 
    LOADING_UI, 
    SET_ERRORS, 
    POST_SCREAM, 
    CLEAR_ERRORS, 
    STOP_LOADING_UI, 
    SUBMIT_COMMENT,
    SET_USERDETAIL,
    STOP_LOADING_DATA 
} from '../types';
import axios from '../../contexts/axios';
import { requests } from "../../contexts/axiosRequest";


// get all screams
export const getScreams = () => (dispatch) => {
    dispatch(loadingData())

    axios.get(requests.getScream)
        .then((res) => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })
            dispatch(clearErrors())
        })
        .catch(() => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
        })
}

export const likeScream = (screamId) => (dispatch) => {
    axios.get(`/scream/${screamId}/like`)
        .then((res) => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
}

export const unlikeScream = (screamId) => (dispatch) => {
    axios.get(`/scream/${screamId}/unlike`)
        .then((res) => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
}

export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({ 
                type: DELETE_SCREAM, 
                payload: screamId
            })
        })
        .catch((error) => {
            console.log(error)
        })
}

export const postScream = (newScream) => (dispatch) => {
    dispatch(loadingUi())

    axios.post(requests.fetchCreateScream, newScream)
        .then((res) => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            })
            dispatch(clearErrors())
        })
        .catch((error) => {        
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            })
        })
}


export const getScream = (screamId) => (dispatch) => {
    dispatch(loadingUi())
    
    axios.get(`/scream/${screamId}`)
    .then((res) => {
        dispatch({
            type: SET_SCREAM,
            payload: res.data
        })
        dispatch({ type: STOP_LOADING_UI})
    })
    .catch((error) => {
        console.log(error)
    })
}

export const submitComment = (screamId, commentData) => (dispatch) => {
    axios.post(`/scream/${screamId}/comment`, commentData)
    .then((res) => {
        dispatch({
            type: SUBMIT_COMMENT,
            payload: res.data
        })
        dispatch(clearErrors())
    })
    .catch((error) => {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data
        })
    })
}

export const getUserData = (userHandle) => (dispatch) => {
    dispatch(loadingData())
    
    axios.get(`/user/${userHandle}`)
    .then((res) => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data.screams
        })
        dispatch({
            type: SET_USERDETAIL,
            payload: userHandle
        })
    })
    .catch(() => {
        dispatch({
            type: SET_SCREAMS,
            payload: null
        })
    })
    dispatch({ type: STOP_LOADING_DATA })
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}

export const loadingData = () => (dispatch) => {
    dispatch({ type: LOADING_DATA })
}

export const loadingUi = () => (dispatch) => {
    dispatch({ type: LOADING_UI })
}