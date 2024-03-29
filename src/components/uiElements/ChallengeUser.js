import React from 'react'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoMdPerson } from 'react-icons/io'

import { challengeUser } from '../../actions/users'

export const ChallengeUser = ({ user }) => {
    
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const challenger = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)
    const refreshToken = useSelector(state => state.auth.refreshToken)
    
    const handleChallengeUser = () => {

        dispatch( challengeUser( challenger.id, user.id, challenger.userName, user.userName, navigate, token, refreshToken ) )

    }

    useEffect(() => {
    }, [refreshToken])
    
    return (
        <div className="challenge__user">
            <h3 className="challenge__userh3">
                {user.userName}
                <IoMdPerson />
            </h3>
            <Button variant="primary" onClick={ handleChallengeUser }>Challenge</Button>
        </div>
    )
}
