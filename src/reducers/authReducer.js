import { types } from "../types/types"

export const authReducer = ( state = {}, action ) => {
    switch ( action.type ) {
        case types.LOGIN:
            localStorage.setItem('refreshToken', action.payload.refreshToken)

            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken
            }
        case types.LOGOUT:
            localStorage.clear()

            return {
                ...state,
                isAuthenticated: false,
                user: null,
                role: null,
                token: null,
                refreshToken: null
            }
        case types.REFRESH_TOKEN_SUCCESS:
            localStorage.setItem('refreshToken', action.payload.refreshToken)

            return {
                ...state,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken
            }
        case types.REFRESH_TOKEN_FAILURE:
            localStorage.clear()

            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                refreshToken: null
            }
        default:
            return state
    }
}