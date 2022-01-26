import React from 'react'

export const GamesPlayed = ({ gamesPlayed }) => {

    return (
        <div>
            <p>Played</p>
            <h3>
                {
                    gamesPlayed
                }
            </h3>
        </div>
    )
}
