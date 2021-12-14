import React from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { ChallengeUser } from '../uiElements/ChallengeUser'

const users = [
    {
        id: 1,
        name: 'demonSlayer',
    },{
        id: 2,
        name: 'glarcErestf',
    },{
        id: 3,
        name: 'einiColkwai',
    },{
        id: 4,
        name: 'Waroingulsb',
    },{
        id: 5,
        name: 'ionSisterge',
    },{
        id: 6,
        name: 'sousHydimet ',
    }
]

export const Challenge = () => {
    return (
        <div className="base__div challenge_div">
            <header className="container base__secondaryHeader">
                <Button variant="danger">Cancel</Button>{' '}
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
                    users.map(user => (
                        <ChallengeUser key={user.id} user={user} />
                    ))
                }
            </div>
        </div>
    )
}
