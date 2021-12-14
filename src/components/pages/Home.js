import React from 'react'
import { Button } from 'react-bootstrap'
import { GamesPlayed } from '../uiElements/GamesPlayed'
import { GamesWon } from '../uiElements/GamesWon'
import { WinningStreak } from '../uiElements/WinningStreak'

export const Home = () => {
    return (
        <div className="base__div">

            <header className="container home__header">
                <h1>RPS</h1>
                <Button variant="danger">Logout</Button>{' '}
            </header>

            <div className="base__titleDiv">
                <h2>bgrajales97</h2>
            </div>

            <div className="home__statsDiv">
                <GamesPlayed />
                <GamesWon />
            </div>

            <WinningStreak />

            <div className="d-grid gap-2 container">
                <Button variant="primary" size="lg">
                    Start new game
                </Button>
            </div>

        </div>
    )
}
