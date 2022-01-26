import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getChallengers, searchUser } from '../../actions/users'
import { ChallengeUser } from '../uiElements/ChallengeUser'

export const Challenge = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const onlineUsers = useSelector(state => state.users.onlineUsers)
    const user = useSelector(state => state.auth.user)

    const [ userInput, setUserInput ] = useState('')

    const [ userSearched, setUserSearched ] = useState({
        userName: '',
        userId: '',
    })

    const handleGoBack = () => {
        navigate('/app/home')
    }

    useEffect(() => {
        dispatch( getChallengers( user.id ) )
    }, [dispatch, user.id])

    const handleSearchChange = (e) => {
        setUserInput(e.target.value)

        if (e.target.value.length > 5) {

            searchUser(e.target.value, setUserSearched)

        } else {
            setUserSearched({
                userName: '',
                userId: '',
            })
        }
    }

    return (
        <div className="base__div challenge_div">
            <header className="container base__secondaryHeader">
                <Button variant="danger" onClick={ handleGoBack }>Cancel</Button>{' '}
            </header>

            <div className="challenge__infoDiv">
                <div className="base__titleDiv">
                    <h2 styles={
                        {
                            textAlign: 'center',
                        }
                    }>Challenge a player</h2>
                </div>

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
                            userSearched.userName && userInput.length > 5 ?
                            <ChallengeUser
                                key={ userSearched.userId }
                                user={ {
                                    userName: userSearched.userName,
                                    id: userSearched.userId,
                                } }
                            />
                            : userSearched.userName === '' && userInput.length > 5 ?
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
                        onlineUsers?.length === 0 &&
                        <p>No online players</p>
                    }
                </div>
            </div>
        </div>
    )
}
