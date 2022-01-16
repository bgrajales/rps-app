import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { getActiveGames } from '../../actions/users'
import { useSelector } from 'react-redux'
import { GameDiv } from '../uiElements/GameDiv'

export const GamesInProgress = () => {

    const navigate = useNavigate()

    const user = useSelector(state => state.auth.user)
    const [currentGames, setCurrentGames] = useState([]);

    const handleGoBack = () => {
        navigate(-1)
    }

    useEffect( () => {

        getActiveGames(user.id, setCurrentGames)

    }, [user.id])

    return (
        <div className="base__div">
             <header className="container home__header">
                <h1>RPS</h1>
                <div>
                    <NavLink 
                        to="/app/gamesInProgress" 
                        className={
                            ({ isActive }) => isActive ? 'active' : ''
                        }
                    >
                        <Button variant="link">Games in progress</Button>
                    </NavLink>
                    <NavLink 
                        to="/app/gamesHistory"
                        className={
                            ({ isActive }) => isActive ? 'active' : ''
                        }
                    >
                        <Button variant="link">Games History</Button>
                    </NavLink>

                </div>
                <Button variant="danger" onClick={ handleGoBack }>Go Back</Button>{' '}
            </header>

            {
                currentGames.length > 0 ?
                <>
                    <h2>Games in progress</h2>
                    <ul>
                        {
                            currentGames.map( game => (
                                <GameDiv key={ game.id } game={ game } />
                            ))
                        }
                    </ul>
                </>
                :
                <h2>No games in progress</h2>
            }
        </div>
    )
}
