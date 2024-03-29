import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { HiHome } from 'react-icons/hi'
import { FcNext, FcPrevious } from 'react-icons/fc'


import { GameDiv } from '../uiElements/GameDiv'
import { getActiveGames } from '../../actions/users'
import { MutatingDots } from 'react-loader-spinner'

export const GamesInProgress = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)
    const refreshToken = useSelector(state => state.auth.refreshToken)
    
    const [ loader, setLoader ] = useState(true)

    const [currentGames, setCurrentGames] = useState([]);

    const [ page, setPage ] = useState(1)
    const [ maxPages, setMaxPages ] = useState(1)

    useEffect( () => {

        sessionStorage.setItem('lastPath', `/app/gamesInProgress`)
        dispatch(getActiveGames(user.id, setCurrentGames, page, setMaxPages, setLoader, token, refreshToken))

    }, [user.id, page, token, refreshToken, dispatch])

    const nextPage = () => {

        if ( page < maxPages ) {

            setPage(page + 1)

        }

    }

    const prevPage = () => {

        if ( page > 1 ) {

            setPage(page - 1)

        }

    }

    return (
        <div className="base__div">
            <header className="container home__header">
                <h1>RPS</h1>
                <div className="base__navBar">
                    <NavLink
                        to="/app/home"
                        className={
                            ({ isActive }) => isActive ? 'active' : ''
                        }
                    >
                        <HiHome className="base__navHome base__navLink" />
                    </NavLink>
                    <NavLink 
                            to="/app/gamesInProgress" 
                            className={
                                ({ isActive }) => isActive ? 'base__navLink active' : 'base__navLink'
                            }
                        >
                            Games
                        </NavLink>
                        <NavLink 
                            to="/app/gamesHistory"
                            className={
                                ({ isActive }) => isActive ? 'base__navLink active' : 'base__navLink'
                            }
                        >
                            History
                        </NavLink>
                </div>
            </header>

            {
                currentGames.length > 0 && loader === false ?
                <div className="gameProgress__bodyDiv">

                    <div className="gameHistory__titleDiv">
                        <FcPrevious onClick={ prevPage }/>
                        <h2>Games in Progress</h2>
                        <FcNext onClick={ nextPage }/>
                    </div>
                    
                    <ul className="container">
                        {
                            currentGames.map( game => (
                                <GameDiv key={ game.id } game={ game } />
                            ))
                        }
                    </ul>
                </div>
                : loader === false ?
                <div className="gameProgress__bodyDiv">
                    <div className="gameProgress__noGames">
                        <h2>No games in progress</h2>
                        <p>You can challenge a player by clicking the button below</p>

                        <NavLink to="/app/challenge">
                            <Button variant="primary">Challenge a player</Button>
                        </NavLink>
                    </div>
                </div>
                : loader === true ?
                <div className="base__rpsLoader">
                    <MutatingDots ariaLabel="loading-indicator" color={'black'} secondaryColor='black' />
                </div>
                :
                null
            }
        </div>
    )
}
