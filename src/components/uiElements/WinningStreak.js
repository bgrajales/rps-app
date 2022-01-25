import React from 'react'

export const WinningStreak = ({ winningStreak }) => {

    return (
        <div className="home__winningStreak">
            <h3>Winning streak</h3>
            <p>
                {
                   winningStreak
                }
                {
                    winningStreak === 1 ? ' game' : ' games'
                }
            </p>
        </div>
    )
}
