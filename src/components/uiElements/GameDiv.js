import React from 'react'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import { socket } from '../../actions/users'

export const GameDiv = ({ game }) => {

    const handleContinue = () => {
        console.log('continue')

        socket.emit('joinGame', {
            gameId: game.id,
        })
    }

    return (
        <>
          <li className="gamesProgress__li">
                <h4>{ game.player2.userName }</h4>
                <hr />

                <div className="gamesProgress__roundsDiv">
                    <div className="gamesProgress__round">
                        <h4>Round 1</h4>
                        {
                            game.rounds[0].player1hand === 'null' ?
                            <p>Waiting for your pick...</p> :
                            <p>{ game.rounds[0].player1hand } vs { game.rounds[0].player2hand }</p>    

                        }
                    </div>
                    <div className="gamesProgress__round">
                        <h4>Round 2</h4>
                        {
                            game.rounds[1].player1hand === 'null' ?
                            <p>Waiting for your pick...</p> :
                            <p>{ game.rounds[1].player1hand } vs { game.rounds[1].player2hand }</p>
                        }
                    </div>
                    <div className="gamesProgress__round">
                        <h4>Round 3</h4>
                        {
                            game.rounds[2].player1hand === 'null' ?
                            <p>Waiting for your pick...</p> :
                            <p>{ game.rounds[2].player1hand } vs { game.rounds[2].player2hand }</p>
                        }
                    </div>
                </div>
                <hr />
                <NavLink to={`/app/game/${game.id}`}>
                    <Button variant="primary" onClick={ handleContinue }>                    
                        Continue Game
                    </Button>
                </NavLink>
            </li>  
        </>
    )
}
