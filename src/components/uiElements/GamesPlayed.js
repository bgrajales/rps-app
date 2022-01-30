import React from 'react'
import { Oval } from 'react-loader-spinner'

export const GamesPlayed = ({ gamesPlayed, loading }) => {

    return (
        <div className="shadow">
            <p>Played</p>
            {
                loading ?
                <Oval
                    color="#000"
                    secondaryColor="#656565"
                    strokeWidth={6}
                />
                :
                <h3>
                {
                    gamesPlayed
                }
            </h3>
            }
        </div>
    )
}
