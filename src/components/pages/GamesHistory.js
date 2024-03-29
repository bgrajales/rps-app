import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HiHome } from 'react-icons/hi'
import { FcNext, FcPrevious } from 'react-icons/fc'

import { GameHistoryLi } from '../uiElements/GameHistoryLi'
import { getGamesHistory } from '../../actions/users'
import { MutatingDots } from 'react-loader-spinner'

export const GamesHistory = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const token = useSelector(state => state.auth.token)
    const refreshToken = useSelector(state => state.auth.refreshToken)
    
    const [games, setGames] = useState([])
    const [ page, setPage] = useState(1)
    const [ loader, setLoader ] = useState(true)

    const [ maxPage, setMaxPage] = useState(1)

    useEffect( () => {

        sessionStorage.setItem('lastPath', `/app/gamesHistory`)
        dispatch(getGamesHistory( user.id, setGames, page, setMaxPage, setLoader, token, refreshToken ))

    }, [ user.id, page, token, refreshToken, dispatch])

    const nextPage = () => {

        if( page < maxPage ) {

            setPage( page + 1 )

        } 
    }

    const prevPage = () => {

        if( page > 1 ) {

            setPage( page - 1 )

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
                games.length > 0 && loader === false ?
                <div className="gameHistory__bodyDiv">

                    <div className="gameHistory__titleDiv">
                        <FcPrevious onClick={ prevPage }/>
                        <h2>Games History</h2>
                        <FcNext onClick={ nextPage }/>
                    </div>
                    <ul className="gameHistory__ul container">
                        {
                            games.map( game => (
                                <GameHistoryLi key={ game.id } game={ game } />
                            ))
                        }
                    </ul>

                </div>
                : loader === false ?
                <div className="gameHistory__bodyDiv">

                    <div className="gameHistory__noGames">
                        <h2>No games played yet</h2>
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
