import React from 'react'

export const GamesPlayed = ({ gamesPlayed }) => {

    return (
        <div>
            <p>Games played</p>
            <h3>
                {
                    gamesPlayed
                }
            </h3>
        </div>
    )
}
