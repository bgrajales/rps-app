import { Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RiRefreshLine } from 'react-icons/ri'

import { clearError, getChallengers, searchUser } from '../../actions/users'
import { ChallengeUser } from '../uiElements/ChallengeUser'
import { ChallengeAiUser } from '../uiElements/ChallengeAiUser'

var genUsername = require('unique-username-generator')

export const Challenge = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const error = useSelector(state => state.error)
    const onlineUsers = useSelector(state => state.users.onlineUsers)
    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)
    const refreshToken = useSelector(state => state.auth.refreshToken)
    
    const [ userInput, setUserInput ] = useState('')

    const [ userSearched, setUserSearched ] = useState({
        userName: '',
        userId: '',
    })

    const [ aiUsers, setAiUsers ] = useState([])

    const handleGoBack = () => {
        dispatch( clearError() )
        sessionStorage.setItem('lastPath', `/app/home`)
        navigate('/app/home')
    }

    useEffect(() => {
        sessionStorage.setItem('lastPath', `/app/challenge`)
        dispatch( getChallengers( user.id, token, refreshToken ) )

        if(aiUsers.length === 0) {
            let auxAiUsers = []

            if( onlineUsers?.length >= 0 && onlineUsers.length < 5 ) {
        
                for(let i = 0; i < 5 - onlineUsers.length; i++) {
                    
                    const iaUsername = genUsername.generateUsername("", 0, 9)
                    const iaUserId = Math.random().toString(36).slice(2)
        
                    auxAiUsers.push({
                        userName: iaUsername,
                        userId: iaUserId,
                    })
                }
        
            }

            setAiUsers( auxAiUsers )
        }

    }, [dispatch, user.id, token, refreshToken, onlineUsers, aiUsers])

    const handleSearchChange = (e) => {
        setUserInput(e.target.value)

        if (e.target.value.length > 5) {

            dispatch(searchUser(e.target.value, setUserSearched, token, refreshToken))

        } else {
            setUserSearched({
                userName: '',
                userId: '',
            })
        }
    }

    const handleOnlineRefresh = (e) => {
        dispatch( getChallengers( user.id, token, refreshToken ) )
        e.target.classList.add('challenge__rotating')

        setTimeout(() => {
            e.target.classList.remove('challenge__rotating')
        }, 1000)
    }

    return (
        <div className="base__div challenge_div">
            <header className="container base__secondaryHeader">
                <Button variant="danger" onClick={ handleGoBack }>Cancel</Button>{' '}
            </header>

            <div className="challenge__infoDiv">
                <div className="challenge__titleDiv">
                    <h2 style={{textAlign: 'center'}}>Challenge a player</h2>
                    <RiRefreshLine className="challenge__refresh" onClick={ handleOnlineRefresh }/>
                </div>

                {
                    error.message && (
                        <Alert severity="error" className="challenge__error">
                            { error.message }
                        </Alert>
                    )
                }

                <div className="challenge__subDiv">
                    <h2 className="challenge__subTitle">Search a friend</h2>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={ userInput }
                            onChange={ handleSearchChange }
                        />
                        <div className="challenge__searchInfo">
                        {
                            userSearched.userName && userInput.length > 5 && userSearched.userName !== user.userName ?
                            <ChallengeUser
                                key={ userSearched.userId }
                                user={ {
                                    userName: userSearched.userName,
                                    id: userSearched.userId,
                                } }
                            />
                            : userInput.length > 5 ?
                            <h2>No user found</h2>
                            : null
                        }
                        </div>
                    </InputGroup>

                    
                </div>

                <div className="challenge__subDiv">
                    <h2 className="challenge__subTitle">Online players:</h2>
                    {
                        onlineUsers?.length > 0 &&
                        onlineUsers.map(user => (
                            <ChallengeUser key={ user.id } user={ user } />
                        ))
                    }
                    {
                        aiUsers?.length > 0 &&
                        aiUsers.map(user => (
                            <ChallengeAiUser key={ user.userId } user={ user } />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
