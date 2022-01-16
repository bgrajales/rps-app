import React from 'react'

export const RoundWinnerIndicator = ( { round, player } ) => {

    console.log(round.winner)

    return (
        <div
            className={
                `game__winnerRound ${round.winner === 'null' 
                ? 'game__gray' : round.winner === player ? 'game__green' : 'game__red'}`
            }
        ></div>
    )
}
