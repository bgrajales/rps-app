import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { getActiveGames } from '../../actions/users'
import { useSelector } from 'react-redux'
import { GameDiv } from '../uiElements/GameDiv'
import { HiHome } from 'react-icons/hi'

export const GamesInProgress = () => {

    const navigate = useNavigate()

    const user = useSelector(state => state.auth.user)
    const [currentGames, setCurrentGames] = useState([]);

    useEffect( () => {

        getActiveGames(user.id, setCurrentGames)

    }, [user.id])

    return (
        <div className="base__div">
            <header className="container home__header">
                <h1>RPS</h1>
                <div>
                    <NavLink
                        to="/app/home"
                        className={
                            ({ isActive }) => isActive ? 'active' : ''
                        }
                    >
                        <HiHome />
                    </NavLink>
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
            </header>

            {
                currentGames.length > 0 ?
                <div className="gameProgress__bodyDiv">
                    <h2>Games in progress</h2>
                    <ul>
                        {
                            currentGames.map( game => (
                                <GameDiv key={ game.id } game={ game } />
                            ))
                        }
                    </ul>
                </div>
                :
                <div className="gameProgress__bodyDiv">
                    <div className="gameProgress__noGames">
                        <h2>No games in progress</h2>
                        <p>You can challenge a player by clicking the button below</p>

                        <NavLink to="/app/challenge">
                            <Button variant="primary">Challenge a player</Button>
                        </NavLink>
                    </div>
                </div>
            }
        </div>
    )
}
