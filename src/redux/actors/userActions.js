// import axios from "axios";
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";
import axios from '../../contexts/axios';
import { requests } from "../../contexts/axiosRequest";


// Action：ユーザーがActionInputを行うと下記が発火
export const loginUser = (userData, navigation) => (dispatch) => {
    // dispatchを使用し、Reducerへアクセス:ReduxStateを更新するように依頼
    dispatch({ type: LOADING_UI })

    axios.post(requests.fetchLogin, userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            dispatch({ type: CLEAR_ERRORS })
            navigation('/')
        })
        .catch((error) => {        
            dispatch({
            type: SET_ERRORS,
            payload: error.response.data
            })
        })
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Token ${token}`
    localStorage.setItem('FBIdToken', FBIdToken)
    axios.defaults.headers.common['Authorization'] = FBIdToken
}

export const getUserData = () => (dispatch) => {
    axios.get('/user')
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
}