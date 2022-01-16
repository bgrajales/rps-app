import React from 'react'
import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as Paper } from '../../assets/images/paper.svg'
import { ReactComponent as Rock } from '../../assets/images/rock.svg'
import { ReactComponent as Scissors } from '../../assets/images/scissors.svg'

export const GameHistoryLi = ({ game }) => {
    return (
        <li className="gameHistory__li">
            <div className="gameHistory__infoDiv">
                <p>Finished:  { format(new Date(game.endDate), 'LLLL do yyyy') }</p>
                <p>Against:  { game.opponent }</p>
                <p>{ 
                    game.win === 1 ? 'Game Won' : 'Game Lost'
                }</p>
            </div>
            <div className="gameHistory__picksDiv">{ 
                game.picks.map( pick => (
                    <span key={ `${uuidv4()}` }>{ 
                        pick === 'r' ? <><Rock /> <span>Rock</span></> :
                        pick === 'p' ? <><Paper /> <span>Paper</span></> :
                        pick === 's' ? <><Scissors /> <span>Scissors</span></> :
                        ''
                    }</span>
                ))
            }</div>
        </li>
    )
}
