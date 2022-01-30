import { types } from "../types/types"

export const errorReducer = ( state = {}, action ) => {

    switch ( action.type ) {

        case types.ERROR:
            return {
                ...state,
                message: action.payload
            }
        case types.CLEAR_ERROR:
            return {
                ...state,
                message: null
            }
        default:
            return state
    }

}
