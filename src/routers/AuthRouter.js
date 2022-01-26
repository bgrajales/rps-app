import React from 'react'
import {
    Routes,
    Route
} from "react-router-dom";

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { Landing } from '../components/pages/Landing';

export const AuthRouter = () => {
    return (
        <Routes>
            <Route index element={<Landing />} />
            <Route path="/login" element={<LoginScreen />}/>
            <Route path="/register" element={<RegisterScreen />}/>        
        </Routes>
    )
}
