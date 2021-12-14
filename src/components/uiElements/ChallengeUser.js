import React from 'react'
import { Button } from 'react-bootstrap'

export const ChallengeUser = ({ user }) => {
    return (
        <div className="challenge__user">
            <h3>{user.name}</h3>
            <Button variant="primary">Challenge</Button>
        </div>
    )
}
