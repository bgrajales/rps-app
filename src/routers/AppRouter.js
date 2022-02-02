import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import { userAlreadyLoggedIn } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { AuthRouter } from './AuthRouter';
import { DashboardRouter } from './DashboardRouter';
import { finishLoading, startLoading } from '../actions/ui';

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch( startLoading() );

        const refreshToken = localStorage.getItem('refreshToken') || undefined;
        setTimeout(() => {
            if (refreshToken) {
                dispatch( userAlreadyLoggedIn( refreshToken ) )
            } else {
                sessionStorage.clear();
                dispatch( finishLoading() )
            }
        }, 1500)

    }, [dispatch])
    return (
        <Router>
            <div>
                <Routes>

                    <Route path="/*" element={
                        <PublicRoute>
                            <AuthRouter />
                        </PublicRoute>
                    }/>

                    <Route path="/app/*" element={
                        <PrivateRoute>
                            <DashboardRouter />
                        </PrivateRoute>
                    }/>

                </Routes>
            </div>
        </Router>
    )
}
