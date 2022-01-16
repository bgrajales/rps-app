import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { finishGameAction, getGameRound, goToNextRound, setActiveGamePlayerHand } from '../../actions/users'
import { ReactComponent as Paper } from '../../assets/images/paper.svg'
import { ReactComponent as Rock } from '../../assets/images/rock.svg'
import { ReactComponent as Scissors } from '../../assets/images/scissors.svg'
import { Player1Choice } from '../uiElements/Player1Choice'
import { Player2Choice } from '../uiElements/Player2Choice'
import { PlayerChoiceResume } from '../uiElements/PlayerChoiceResume'
import { RoundWinnerIndicator } from '../uiElements/RoundWinnerIndicator'

export const Game = () => {

    const { gameId } = useParams()

    const user = useSelector(state => state.auth.user)
    
    const [activeGame, setActiveGame] = useState({})
    
    const [roundGame, setRound] = useState({
        round: 'null',
        player1hand: 'null',
        player2hand: 'null',
        winner: 'null'
    })

    useEffect(() => {
        
        console.log(user.id, gameId)
        getGameRound( user.id, gameId, setRound, setActiveGame )
        document.body.classList.add('game-page')

        return () => {
            document.body.classList.remove('game-page')
        }

    }, [ user.id, gameId, setRound, setActiveGame ])

    const pickHand = ( hand ) => {

        setActiveGamePlayerHand( user.id, activeGame.player2.id, activeGame.id, roundGame.round, hand, setRound )

    }

    const nextRound = ( ) => {

        goToNextRound( user.id, activeGame.id, roundGame.round, setRound )

    }

    const finishGame = ( ) => {
        finishGameAction( user.id, activeGame.id )
    }

    if ( roundGame.round === 3 && roundGame.winner !== 'null' ) {
        document.body.classList.remove('game-page')
    }

    if ( roundGame.round === 3 && roundGame.winner !== 'null' ) {
        return (
            <div className="base__div game__div">

                <div className="game__nameVsDiv">
                    <h2>
                        {
                            activeGame.player1.userName
                        }
                    </h2>
                    <h1>VS</h1>
                    <h2>
                        {
                            activeGame.player2.userName
                        }
                    </h2>
                </div>   

                <h4>You</h4>
                <div className="game__rounds">
                    {
                        activeGame.rounds.map( ( round, index ) => {
                            return (
                                <PlayerChoiceResume 
                                    key={index}
                                    round={round}
                                    player={ 'player1' }
                                />
                            )
                        })
                    }
                </div>   

                <h4>{
                    activeGame.player2.userName
                }</h4>
                 <div className="game__rounds">
                    {
                        activeGame.rounds.map( ( round, index ) => {
                            return (
                                <PlayerChoiceResume 
                                    key={index}
                                    round={round}
                                    player={ 'player2' }
                                />
                            )
                        })
                    }
                </div>           

                <Button onClick={ finishGame }>
                    Finish Game
                </Button>
            </div>
        )
    } else {

        return (
            <div className="game__div">
                <header>
                    <div>
                        <h2>Round {roundGame.round}/3</h2>
                        <div className="game__nameDiv">
                            <h4>{ user.userName }</h4>
                            {
                                activeGame.rounds?.map(round =>{
                                    return <RoundWinnerIndicator key={ round.round } round={ round } player={ 'player1' } />
                                })
                            }
                        </div>
                        <div className="game__nameDiv">
                            <h4> { activeGame.player2?.userName } </h4>
                            {
                                activeGame.rounds?.map(round =>{
                                    return <RoundWinnerIndicator key={ round.round } round={ round } player={ 'player2' } />
                                })
                            }
                        </div>
                    </div>

                    <Button variant="danger">
                        Leave Game
                    </Button>
                </header>

                <div className="game__handsPickDiv">
                    <div className="game__player2Choice">
                        {
                            roundGame.player2hand === 'null' || roundGame.player1hand === 'null' ?
                            <div className="game__player2ChoiceNull">
                                <h1>Waiting for Player 2...</h1>
                            </div>
                            :
                            <div className="game__player2ChoicePickand">
                                <Player2Choice hand={ roundGame.player2hand } />
                            </div>
                        }
                    </div>

                    <div className="game__player1Choice">
                        {
                            roundGame.player1hand === 'null' ?
                            <div className="game__player1ChoiceNull">
                                <h1>Pick your hand!</h1>
                                <div className="game__player1ChoiceHand">
                                    <div className="game__paperImage">
                                        <Paper className="game__hand" onClick={ () => pickHand('p') }/>
                                    </div>
                                    <div className="game__rockImage">
                                        <Rock className="game__hand" onClick={ () => pickHand('r') }/>
                                    </div>
                                    <div className="game__scissorsImage">
                                        <Scissors className="game__hand" onClick={ () => pickHand('s') }/>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="game__player1ChoicePick">
                                <Player1Choice hand={roundGame.player1hand} />
                            </div>
                        }
                        
                    </div>

                    
                </div>
                {
                    roundGame.winner !== 'null' &&
                    <div className="game__nextRound">
                        <Button variant="primary" onClick={ () => nextRound() }>
                            Next Round
                        </Button>
                    </div>
                }
            </div>
        )
    }
}
