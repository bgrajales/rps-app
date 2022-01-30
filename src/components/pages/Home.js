import React, { useEffect, useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { BsFillBellFill } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { FiMoreHorizontal } from 'react-icons/fi'
import { HiHome } from 'react-icons/hi'

import { userLogout } from '../../actions/auth'
import { deleteSelectedNotif, getStats, markNotificationAsRead, socket } from '../../actions/users'
import { GamesPlayed } from '../uiElements/GamesPlayed'
import { GamesWon } from '../uiElements/GamesWon'
import { WinningStreak } from '../uiElements/WinningStreak'

export const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(state => state.auth.user)
    const userNotification = useSelector(state => state.auth.user.notifications)
    const token = useSelector(state => state.auth.token)
    const refreshToken = useSelector(state => state.auth.refreshToken)

    const [ badgeIcon, setBadgeIcon ] = useState(false)

    const [ notifications, setNotifications ] = useState([])

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

        dispatch(getStats( user.id, setStats, token, refreshToken ))

        setNotifications( userNotification )

    }, [ user.id, userNotification, token, refreshToken, dispatch ])

    socket.on('challenge', (challenge) => {
        console.log(challenge)

        const newNotification = {
            id: Math.random(),
            message: `${challenge.challenger} has challenged you!`,
            status: 'unread',
            challenger: challenge.challenger,
            gameId: challenge.gameId,
        }

        const notifArray = notifications

        const indexOf = notifArray.findIndex(notif => notif.gameId === challenge.gameId)

        if ( indexOf === -1 ) {

            notifArray.push(newNotification)

        }

        setNotifications(notifArray)

    })

    const handleReadNotifications = () => {
        
        if( notifications.length > 0 ) {

            dispatch(markNotificationAsRead( user.id, token, refreshToken ))

            notifications.map(notif => {
                notif.status = 'read'

                return notif
            })

            setBadgeIcon(false)

        }
        
    }

    const handleNotifClick = ( gameId ) => {
        
        dispatch(deleteSelectedNotif( user.id, gameId, token, refreshToken ))

        if ( notifications.length === 1 ) {
            setNotifications([])
        } else {

            const index = notifications.findIndex(notif => notif.gameId === gameId)
            
            const notifArray = notifications
            
            notifArray.splice(index, 1)
            
            setNotifications(notifArray)
        
        }

        socket.emit('joinGame', {
            gameId: gameId,
        })
        
        navigate(`/app/game/${gameId}`)
    }

    const handleDeleteClick = ( gameId ) => {

        if ( notifications.length === 1 ) {
            setNotifications([])
        } else {

            const index = notifications.findIndex(notif => notif.gameId === gameId)
            
            const notifArray = notifications
            
            notifArray.splice(index, 1)
            
            setNotifications(notifArray)
        
        }
        
        dispatch(deleteSelectedNotif( user.id, gameId, token, refreshToken))
    }

    if (notifications?.length > 0 && badgeIcon === false) {
        notifications.forEach(notif => {
            if (notif.status === 'unread') {
                setBadgeIcon(true)
            } 
        })
    }

    return (
        <div className="base__div">

            <header className="container home__header">
                <h1>RPS</h1>
                <div className="base__navBar">
                <Dropdown onClick={ handleReadNotifications }>
                    <Dropdown.Toggle variant="" id="dropdown-basic" className={ badgeIcon ? 'badgeDot' : '' }>
                        <BsFillBellFill className="home__notifBell" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            notifications.length === 0 ?
                            <Dropdown.Item>
                                No notifications
                            </Dropdown.Item>
                            :
                            notifications.map( notification => (
                                <div className="home__notifDiv dropdown-item" key={ notification.id }  >

                                        <FaTrash onClick={ () => handleDeleteClick(notification.gameId) } />
                                        
                                        <div className="home__notifDiv" onClick={ () => handleNotifClick(notification.gameId) }>

                                            <p>{ notification.message }</p>
                                            <FiMoreHorizontal />

                                        </div>
                                </div>
                            ))

                        }
                    </Dropdown.Menu>
                    </Dropdown>
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
                    <div className="home__btnDiv container">
                        <Button variant="primary" size="lg">
                            Start new game
                        </Button>
                        <Button variant="danger" onClick={ handleLogout }>
                            Logout    
                        </Button>{' '}
                    </div>
                </Link>
            </div>
        </div>
    )
}
