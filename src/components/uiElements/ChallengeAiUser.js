import React from 'react'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaRobot } from 'react-icons/fa'

import { challengeAi } from '../../actions/users'

export const ChallengeAiUser = ({ user }) => {
    
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const challenger = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)
    const refreshToken = useSelector(state => state.auth.refreshToken)
    
    const handleChallengeAi = () => {

        dispatch( challengeAi( challenger.id, user.userId, challenger.userName, user.userName, navigate, token, refreshToken ) )

    }

    useEffect(() => {
    }, [refreshToken])
    
    return (
        <div className="challenge__user">
            <h3 className="challenge__userh3">
                {user.userName}
                <FaRobot />
            </h3>
            
            <Button variant="primary" onClick={ handleChallengeAi }>Challenge</Button>
        </div>
    )
}