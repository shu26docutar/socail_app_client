import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM } from '../types'
import axios from '../../contexts/axios';
import { requests } from "../../contexts/axiosRequest";

// get all screams
export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA })

    axios.get(requests.getScream)
        .then((res) => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })
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