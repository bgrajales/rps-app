import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { challengeUser } from '../../actions/users'

export const ChallengeUser = ({ user }) => {
    
    const dispatch = useDispatch()
    const challenger = useSelector(state => state.auth.user)

    const handleChallengeUser = () => {
        console.log('challenge user', user.id)

        dispatch( challengeUser( challenger.id, user.id, challenger.userName, user.userName ) )
    }
    
    return (
        <div className="challenge__user">
            <h3>{user.userName}</h3>
            <Button variant="primary" onClick={ handleChallengeUser }>Challenge</Button>
        </div>
    )
}