import React, { useEffect } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getChallengers } from '../../actions/users'
import { ChallengeUser } from '../uiElements/ChallengeUser'

export const Challenge = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const onlineUsers = useSelector(state => state.users.onlineUsers)
    const user = useSelector(state => state.auth.user)

    const handleGoBack = () => {
        navigate('/app/home')
    }

    useEffect(() => {
        dispatch( getChallengers( user.id ) )
    }, [dispatch, user.id])

    console.log(onlineUsers)
    return (
        <div className="base__div challenge_div">
            <header className="container base__secondaryHeader">
                <Button variant="danger" onClick={ handleGoBack }>Cancel</Button>{' '}
            </header>

            <div className="base__titleDiv">
                <h2>Challenge a player</h2>
            </div>

            <div className="challenge__subDiv">
                <h2 className="challenge__subTitle">Search a friend</h2>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <FormControl
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    />
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
    )
}
