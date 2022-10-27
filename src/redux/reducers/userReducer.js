import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER } from "../types";

// UserDataに関連するStateのReducer
// Redux データの初期値
const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
}

// 無名関数宣言:Dispatchで通知を受けると、処理内容に合わせて値を変換
export default function(state = initialState, action) {
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return initialState
        case SET_USER:
            return {
                authenticated: true,
                ...action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}