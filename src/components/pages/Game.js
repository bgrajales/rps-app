import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { finishGameAction, getGameRound, goToNextRound, setActiveGamePlayerHand, socket } from '../../actions/users'
import { ReactComponent as Paper } from '../../assets/images/paper.svg'
import { ReactComponent as Rock } from '../../assets/images/rock.svg'
import { ReactComponent as Scissors } from '../../assets/images/scissors.svg'
import { setWinner } from '../../utils/setWinner'
import { Player1Choice } from '../uiElements/Player1Choice'
import { Player2Choice } from '../uiElements/Player2Choice'
import { PlayerChoiceResume } from '../uiElements/PlayerChoiceResume'
import { RoundWinnerIndicator } from '../uiElements/RoundWinnerIndicator'

export const Game = () => {

    const navigate = useNavigate()

    const { gameId } = useParams()

    const user = useSelector(state => state.auth.user)
    
    const [ activeGame, setActiveGame ] = useState({})

    const [ currentRound, setCurrentRound ] = useState(1)
    const [ updateGame, setUpdateGame ] = useState(false)

    const [roundGame, setRound] = useState({
        round: 'null',
        player1hand: 'null',
        player2hand: 'null',
        winner: 'null'
    })

    useEffect(() => {
        
        getGameRound( user.id, gameId, setRound, setActiveGame )
        document.body.classList.add('game-page')

        return () => {
            document.body.classList.remove('game-page')
        }

    }, [ user.id, gameId, updateGame ])

    const pickHand = ( hand ) => {

        socket.emit('handPicked', {
            gameId: activeGame.id,
            handPicked: hand
        })

        setActiveGamePlayerHand( user.id, activeGame.player2.id, activeGame.id, roundGame.round, hand, setRound, roundGame, setActiveGame, activeGame )

    }

    const nextRound = ( ) => {

        goToNextRound( user.id, activeGame.id, roundGame.round, setRound )

        if( roundGame.round < 3 ) {
            
            setActiveGame({
                ...activeGame,
                currentRound: activeGame.currentRound+1
            })

            setCurrentRound( currentRound+1 )
            
        } 
        
    }

    const finishGame = ( ) => {
        console.log('finish game', user.id, activeGame.id)

        finishGameAction( user.id, activeGame.id )

        setTimeout(() => {

            navigate('/app/home')

        }, 1000)
    }
    
    socket.on('handPickedPlayer2', (data) => {

        const roundWinner = setWinner( roundGame.player1hand, data )

        const updatedRound = {
            round: roundGame.round,
            player1hand: roundGame.player1hand,
            player2hand: data,
            winner: roundWinner
        }

        setRound(updatedRound)
        
        setTimeout(() => {
            setUpdateGame(!updateGame)        
        }, 1000)

    })

    if ( roundGame.round === 3 && roundGame.winner !== 'null' ) {
        document.body.classList.remove('game-page')

        if( currentRound !== 1 ){
            setCurrentRound( 1 )
        }
    }

    if ( roundGame.round === 3 && roundGame.winner !== 'null' ) {
        return (
            <div className="base__div game__div">

                <div className="game__nameVsDiv">
                    <h1>
                        {
                            activeGame.player1.userName
                        }
                    </h1>
                    <h1>VS</h1>
                    <h1>
                        {
                            activeGame.player2.userName
                        }
                    </h1>
                </div>   

                <div class="game__parent">
                    <div class="game__div1">
                        {
                            activeGame.rounds.map( ( round, index ) => {
                                return (
                                    <PlayerChoiceResume 
                                        key={index}
                                        round={ round}
                                        player={ 'player1' }
                                    />
                                )
                            })
                        }
                    </div>
                    
                    <div class="game__div2">
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
                </div>

                <Button onClick={ finishGame } className="container">
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

                    <Button variant="danger" onClick={ () => navigate('/app/home') }>
                        Leave Game
                    </Button>
                </header>

                <div className="game__handsPickDiv">
                    <div className="game__player2Choice">
                        {
                            roundGame.player2hand === 'null' || roundGame.player1hand === 'null' ?
                            <div className="game__player2ChoiceNull">
                                <h1>{
                                    roundGame.player2hand === 'null' ? 'Waiting for Player 2' : 'Player 2 has picked!'
                                }</h1>
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
                    (roundGame.round !== 3 && (roundGame.player1hand !== 'null' && roundGame.player2hand !== 'null')) &&
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
