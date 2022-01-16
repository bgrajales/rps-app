import { types } from "../types/types"

export const usersReducers = ( state = {}, action ) => {

    switch ( action.type ) {
        case types.GET_USERS_LIST:
            return {
                ...state,
                loading: true,
            }
        case types.GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                onlineUsers: action.payload,
            }
        case types.GET_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}