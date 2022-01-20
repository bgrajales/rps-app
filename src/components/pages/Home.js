import React, { useEffect, useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { BsFillBellFill } from 'react-icons/bs'
import { HiHome } from 'react-icons/hi'

import { userLogout } from '../../actions/auth'
import { getStats, socket } from '../../actions/users'
import { GamesPlayed } from '../uiElements/GamesPlayed'
import { GamesWon } from '../uiElements/GamesWon'
import { WinningStreak } from '../uiElements/WinningStreak'

export const Home = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    const handleLogout = () => {
        socket.emit('logout', user.id)

        dispatch( userLogout( user.id ) )
    }

    const [ stats, setStats ] = useState({
        gamesPlayed: 0,
        gamesWon: 0,
        winningStreak: 0,
    })
    // const [ notifications, setNotifications ] = useState([])

    useEffect(() => {

        getStats( user.id, setStats )

    }, [user.id])

    socket.on('challenge', (challenge) => {
        console.log('challenge')
    })

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

                
                <Dropdown>
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                        <BsFillBellFill />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        
                    </Dropdown.Menu>
                </Dropdown>

                <Button variant="danger" onClick={ handleLogout }>Logout</Button>{' '}
            </header>

            <div className="container home__stats">
                <div className="base__titleDiv">
                    <h2>{ user.userName }</h2>
                </div>

                <div className="home__statsDiv">
                    <GamesPlayed gamesPlayed={ stats.gamesPlayed }/>
                    <GamesWon gamesWon={ stats.gamesWon }/>
                </div>

                <WinningStreak winningStreak={ stats.winningStreak }/>
            
                <Link to="/app/challenge">
                    <div className="d-grid gap-2 container">
                        <Button variant="primary" size="lg">
                            Start new game
                        </Button>
                    </div>
                </Link>
            </div>
        </div>
    )
}
