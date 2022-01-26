import React from 'react'

import { ReactComponent as Paper } from '../../assets/images/paper.svg'
import { ReactComponent as Rock } from '../../assets/images/rock.svg'
import { ReactComponent as Scissors } from '../../assets/images/scissors.svg'

export const PlayerChoiceResume = ({ round, player }) => {
    
    if( player === 'player1' ) {

        return (
            <div className={`game__round ${
                round.winner !== player ? 'game__roundLost' : 'game__roundWon'
            }`}>
                <h3>Round {
                    round.round    
                }</h3>
                {
                    round.player1hand === 'p'
                    ? <Paper />
                    : round.player1hand === 'r'
                    ? <Rock />
                    : <Scissors />
                }    
            </div>
        )
    } else {
        return (
            <div className={`game__round ${
                round.winner !== player ? 'game__roundLost' : 'game__roundWon'
            }`}>
                <h3>Round {
                    round.round    
                }</h3>
                {
                    round.player2hand === 'p'
                    ? <Paper />
                    : round.player2hand === 'r'
                    ? <Rock />
                    : <Scissors />
                }    
            </div>
        )
    }
}
