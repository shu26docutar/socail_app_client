import { 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    STOP_LOADING_UI 
} from "../types";

const initialStore = {
    loading: false,
    email: null,
    password: null,
    confirmPassword: null,
    handle: null,
    general: null,
    body: null,
    comment: null
}

// Viewに関連するStateのReducer
export default function(state = initialStore, action) {
    switch(action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                email: action.payload.email,
                password: action.payload.password,
                confirmPassword: action.payload.confirmPassword,
                handle: action.payload.handle,
                general: action.payload.general,
                body: action.payload.body,
                comment: action.payload.comment
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                email: null,
                password: null,
                confirmPassword: null,
                handle: null,
                general: null,
                body: null,
                comment: null
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}