import { types } from "../types/types"

export const loaderReducer = ( state = {}, action ) => {

    switch ( action.type ) {

        case types.uiStartLoading:
            return {
                ...state,
                isLoading: true
            }
        case types.uiFinishLoading:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }

}
