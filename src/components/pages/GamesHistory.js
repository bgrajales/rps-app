import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HiHome } from 'react-icons/hi'

import { GameHistoryLi } from '../uiElements/GameHistoryLi'
import { getGamesHistory } from '../../actions/users'

export const GamesHistory = () => {

    const { user } = useSelector(state => state.auth)

    const [games, setGames] = useState([])

    useEffect( () => {

        getGamesHistory( user.id, setGames )

    }, [ user.id ])

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
                    games.length > 0 ?
                    <div className="gameHistory__bodyDiv">

                        <h2>Games History</h2>

                        <ul className="gameHistory__ul">
                            {
                                games.map( game => (
                                    <GameHistoryLi key={ game.id } game={ game } />
                                ))
                            }
                        </ul>

                    </div>
                    :
                    <div className="gameHistory__bodyDiv">

                        <div className="gameHistory__noGames">
                            <h2>No games played yet</h2>
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
