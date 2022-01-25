import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import { userAlreadyLoggedIn } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { AuthRouter } from './AuthRouter';
import { DashboardRouter } from './DashboardRouter';

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const refreshToken = localStorage.getItem('refreshToken') || undefined;

        if (refreshToken) {
            dispatch( userAlreadyLoggedIn( refreshToken ) )
        } else {
            // dispatch({
            //     logout()
            // })
        }
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
