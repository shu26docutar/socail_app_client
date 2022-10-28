import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM } from '../types'

const initialState = {
    screams: [],
    scream: [],
    loading: false
}

export default function (state = initialState, action) {
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            const index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId)
            state.screams[index] = action.payload
            return {
                ...state
            }
        case DELETE_SCREAM:
            const Dindex = state.screams.findIndex((scream) => scream.screamId === action.payload)
            state.scream.splice(Dindex, 1)
        default:
            return state
    }
}