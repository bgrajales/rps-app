import React from 'react'
import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as Paper } from '../../assets/images/paper.svg'
import { ReactComponent as Rock } from '../../assets/images/rock.svg'
import { ReactComponent as Scissors } from '../../assets/images/scissors.svg'

export const GameHistoryLi = ({ game }) => {
    return (
        <li className="gameHistory__li shadow">
            <div className="gameHistory__infoDiv">
                <div className="gameHistory__finishedAndOpp">
                    <h5>Finished:</h5>  
                    <p>{ format(new Date(game.endDate), 'LLLL do yyyy') }</p>
                </div>
                <div className="gameHistory__finishedAndOpp">
                    <h5>Opponent:</h5>  
                    <p>{ game.opponent }</p>
                </div>
                <p className={ game.win === 1 ? 'badge bg-success' : game.win === 2 ? 'badge bg-primary' : 'badge bg-danger'}>{ 
                    game.win === 1 ? 'Game Won' : game.win === 2 ? 'Game Tied' : 'Game Lost'
                }</p>
            </div>
            <div className="gameHistory__picksDiv">{ 
                // game.picks.map( pick => (
                //     <span key={ `${uuidv4()}` }>{ 
                //         pick === 'r' ? <><Rock /> <span>Rock</span></> :
                //         pick === 'p' ? <><Paper /> <span>Paper</span></> :
                //         pick === 's' ? <><Scissors /> <span>Scissors</span></> :
                //         ''
                //     }</span>

                // ))
                game.picks.map( el => (
                    <span key={ `${uuidv4()}` } className={ el.winner === 'player1' ? 'gameHistory__won' : el.winner === 'tie' ? 'gameHistory__tie' : 'gameHistory__lost'}>{
                        el.pick === 'r' ? <><Rock /> <span>Rock</span></> :
                        el.pick === 'p' ? <><Paper /> <span>Paper</span></> :
                        el.pick === 's' ? <><Scissors /> <span>Scissors</span></> :
                        ''
                    }</span>
                ))
            }</div>
        </li>
    )
}
