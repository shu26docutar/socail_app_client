import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";

const initialStore = {
    loading: false,
    email: null,
    password: null,
    general: null
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
                general: action.payload.general
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                email: null,
                password: null,
                general: null,
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}