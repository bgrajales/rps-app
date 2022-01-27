import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

import { authReducer } from '../reducers/authReducer';
import { loaderReducer } from '../reducers/loaderReducer';
import { usersReducer } from '../reducers/usersReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    users: usersReducer,
    loader: loaderReducer,
})

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);