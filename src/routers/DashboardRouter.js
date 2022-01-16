import React from 'react'
import {
    Routes,
    Route
} from "react-router-dom";

import { Challenge } from '../components/pages/Challenge';
import { Game } from '../components/pages/Game';
import { GameSettings } from '../components/pages/GameSettings';
import { GamesHistory } from '../components/pages/GamesHistory';
import { GamesInProgress } from '../components/pages/GamesInProgress';
import { Home } from '../components/pages/Home';

export const DashboardRouter = () => {
    return (
        <>
            <Routes>
                
                <Route path="home" element={<Home />}/>
                <Route path="challenge" element={<Challenge />}/>
                <Route path="gamesettings" element={<GameSettings />}/>
                <Route path="gamesInProgress" element={<GamesInProgress />}/>
                <Route path="game/:gameId" element={<Game />}/>
                <Route path="gamesHistory" element={<GamesHistory />}/>
                
            </Routes>
        </>
    )
}
