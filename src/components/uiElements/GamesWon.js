import React from 'react'
import { Oval } from 'react-loader-spinner'

export const GamesWon = ({ gamesWon, loading }) => {

    return (
        <div className="shadow">
            <p>Won</p>
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
                        gamesWon
                    }
                </h3>
            }
        </div>
    )
}
