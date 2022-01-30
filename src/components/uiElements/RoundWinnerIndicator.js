import React from 'react'

export const RoundWinnerIndicator = ( { round, player } ) => {

    return (
        <div
            className={
                `game__winnerRound ${round.winner === 'null' 
                ? 'game__gray' : round.winner === player ? 'game__green' : round.winner === 'tie' ? 'game__black' : 'game__red'}`
            }
        ></div>
    )
}
