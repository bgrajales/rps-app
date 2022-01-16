import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { GameHistoryLi } from '../uiElements/GameHistoryLi'
import { getGamesHistory } from '../../actions/users'

export const GamesHistory = () => {

    const { user } = useSelector(state => state.auth)

    const [games, setGames] = useState([])

    useEffect( () => {

        getGamesHistory( user.id, setGames )

    }, [ user.id ])

    if( games.length > 0 ) {
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
                    <Button variant="danger" >Go Back</Button>{' '}
                </header>
                
                <div>

                    <h2>Games History</h2>

                    <ul className="gameHistory__ul">
                        {
                            games.map( game => (
                                <GameHistoryLi key={ game.id } game={ game } />
                            ))
                        }
                    </ul>

                </div>
            </div>
        )
    } else {
        return null
    }
}
