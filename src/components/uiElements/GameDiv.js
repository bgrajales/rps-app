import React from 'react'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { socket } from '../../actions/users'
import { deleteSelectedNotif } from '../../actions/users'
import { ReactComponent as Paper } from '../../assets/images/paper.svg'
import { ReactComponent as Rock } from '../../assets/images/rock.svg'
import { ReactComponent as Scissors } from '../../assets/images/scissors.svg'

export const GameDiv = ({ game }) => {

    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)


    const handleContinue = () => {
        console.log('continue')

        deleteSelectedNotif( user.id, game.id, token )

        socket.emit('joinGame', {
            gameId: game.id,
        })
    }

    return (
        <>
          <li className="gamesProgress__li shadow">
              <div className="gamesProgress__liDiv">
                <div className="gamesProgress__opponent">
                    <h3>{ game.player2.userName }</h3>
                    <NavLink to={`/app/game/${game.id}`}>
                        <Button variant="primary" onClick={ handleContinue }>                    
                            Continue Game
                        </Button>
                    </NavLink>
                </div>

                <div className="gamesProgress__roundsDiv">
                    <div className="gamesProgress__round">
                        <h4>Round 1</h4>
                        {
                            game.rounds[0].player1hand === 'null' ?
                            <p>Waiting for your pick...</p> :
                            <div className="gameProgress__vsDiv">
                                <>{ game.rounds[0].player1hand === 'r' ? <Rock /> :
                                game.rounds[0].player1hand === 'p' ? <Paper /> :
                                game.rounds[0].player1hand === 's' ? <Scissors /> :
                                ''
                                }</>
                                <p>vs</p>
                                <>{ game.rounds[0].player2hand === 'r' ? <Rock /> :
                                game.rounds[0].player2hand === 'p' ? <Paper /> :
                                game.rounds[0].player2hand === 's' ? <Scissors /> :
                                ''
                                }</>
                            </div>    

                        }
                    </div>
                    <div className="gamesProgress__round">
                        <h4>Round 2</h4>
                        {
                            game.rounds[1].player1hand === 'null' ?
                            <p>Waiting for your pick...</p> :
                            <div className="gameProgress__vsDiv">
                                <>{ game.rounds[1].player1hand === 'r' ? <Rock /> :
                                game.rounds[1].player1hand === 'p' ? <Paper /> :
                                game.rounds[1].player1hand === 's' ? <Scissors /> :
                                ''
                                }</>
                                <p>vs</p>
                                <>{ game.rounds[1].player2hand === 'r' ? <Rock /> :
                                game.rounds[1].player2hand === 'p' ? <Paper /> :
                                game.rounds[1].player2hand === 's' ? <Scissors /> :
                                ''
                                }</>
                            </div>                           }
                    </div>
                    <div className="gamesProgress__round">
                        <h4>Round 3</h4>
                        {
                            game.rounds[2].player1hand === 'null' ?
                            <p>Waiting for your pick...</p> :
                            <div className="gameProgress__vsDiv">
                                <>{ game.rounds[2].player1hand === 'r' ? <Rock /> :
                                game.rounds[2].player1hand === 'p' ? <Paper /> :
                                game.rounds[2].player1hand === 's' ? <Scissors /> :
                                ''
                                }</>
                                <p>vs</p>
                                <>{ game.rounds[2].player2hand === 'r' ? <Rock /> :
                                game.rounds[2].player2hand === 'p' ? <Paper /> :
                                game.rounds[2].player2hand === 's' ? <Scissors /> :
                                ''
                                }</>
                            </div>   
                        }
                    </div>
                </div>
            </div>
            </li>  
        </>
    )
}
