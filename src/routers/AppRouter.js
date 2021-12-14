import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { Challenge } from '../components/pages/Challenge';
import { Home } from '../components/pages/Home';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Routes>

                    {/* <Route path="/*" element={
                        <PublicRoute>
                            <AuthRouter />
                        </PublicRoute>
                    }/>

                    <Route path="/app/*" element={
                        <PrivateRoute>
                            <DashboardRouter />
                        </PrivateRoute>
                    }/>

                    <Route path="/forbidden" element={<Forbidden />} /> */}
                    
                    <Route path="app/home" element={<Home />}/>
                    <Route path="app/challenge" element={<Challenge />}/>
                </Routes>
            </div>
        </Router>
    )
}
