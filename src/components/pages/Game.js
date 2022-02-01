import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import { BsFillChatLeftFill } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'

import styled, { keyframes } from 'styled-components'
import { bounceInDown, bounceInUp, fadeInRight } from 'react-animations'
import { Transition, animated } from 'react-spring'

import { finishGameAction, getGameRound, goToNextRound, setActiveGamePlayerHand, socket } from '../../actions/users'
import { ReactComponent as Paper } from '../../assets/images/paper.svg'
import { ReactComponent as Rock } from '../../assets/images/rock.svg'
import { ReactComponent as Scissors } from '../../assets/images/scissors.svg'
import { setWinner } from '../../utils/setWinner'
import { Player1Choice } from '../uiElements/Player1Choice'
import { Player2Choice } from '../uiElements/Player2Choice'
import { PlayerChoiceResume } from '../uiElements/PlayerChoiceResume'
import { RoundWinnerIndicator } from '../uiElements/RoundWinnerIndicator'
import { ChatBox } from '../uiElements/ChatBox'

const BounceInDown = styled.div`animation: 1s ${keyframes`${bounceInDown}`}`
const BounceInUp = styled.div`animation: 1s ${keyframes`${bounceInUp}`}`
const FadeInRight = styled.div`animation: 1s ${keyframes`${fadeInRight}`}`

export const Game = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { gameId } = useParams()

    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)
    const refreshToken = useSelector(state => state.auth.refreshToken)
    
    const [ activeGame, setActiveGame ] = useState({})

    const [ currentRound, setCurrentRound ] = useState(1)
    const [ updateGame, setUpdateGame ] = useState(false)
    const [ loader, setLoader ] = useState(true)
    const [ showChat, setShowChat ] = useState(false)
    const [ chatMessages, setChatMessages ] = useState([])
    const [ newMessage, setNewMessage ] = useState(false)

    const [roundGame, setRound] = useState({
        round: 'null',
        player1hand: 'null',
        player2hand: 'null',
        winner: 'null'
    })

    useEffect(() => {
        
        dispatch(getGameRound( user.id, gameId, setRound, setActiveGame, token, refreshToken, setLoader, setChatMessages ))
        document.body.classList.add('game-page')

        return () => {
            document.body.classList.remove('game-page')
        }

    }, [ user.id, gameId, updateGame, token, refreshToken, dispatch ])

    const pickHand = ( hand ) => {

        socket.emit('handPicked', {
            gameId: activeGame.id,
            handPicked: hand
        })

        dispatch(setActiveGamePlayerHand( user.id, activeGame.player2.id, activeGame.id, roundGame.round, hand, setRound, roundGame, setActiveGame, activeGame, token, refreshToken))

    }

    const nextRound = ( ) => {

        dispatch(goToNextRound( user.id, activeGame.id, roundGame.round, setRound, token, refreshToken ))

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

        dispatch(finishGameAction( user.id, activeGame.id, token, refreshToken ))

        setTimeout(() => {

            navigate('/app/home')

        }, 1000)
    }

    const handleChatIconClick = () => {
        setShowChat(!showChat)
        setNewMessage(false)
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

    socket.on('recieveMessage', (data) => {
    
        setChatMessages([
            ...chatMessages,
            data
        ])

        if( !showChat ) {
            setNewMessage(true);
        }

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

                <ChatBox 
                    gameId={ gameId } 
                    userName={ activeGame.player2?.userName } 
                    show={ showChat } 
                    chatMessages={ chatMessages }
                    userId={ user.id }
                    challengedId={ activeGame.player2?.id }
                    setChatMessages={ setChatMessages }
                />

                <div className="game__chatIcon" onClick={ handleChatIconClick }>
                        <BsFillChatLeftFill />
                </div>
            </div>
        )
    } else {

        return (
            <div className="game__div">
                <BounceInDown>
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
                            Leave
                        </Button>
                    </header>
                </BounceInDown>
                <div className="game__handsPickDiv">
                    <BounceInDown className="game__player2Choice">
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
                    </BounceInDown>

                    <BounceInUp className="game__player1Choice"> 
                   {
                       loader ? 
                            <Oval
                                strokeWidth={5}
                                color='#000'
                                secondaryColor="#656565"
                            />
                          :
                          <>
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
                            </>
                            
                   }
                    </BounceInUp>
                </div>

                {
                    (roundGame.round !== 3 && (roundGame.player1hand !== 'null' && roundGame.player2hand !== 'null')) &&
                    <FadeInRight className="game__roundWinner">
                        {
                            roundGame.winner === 'player1' ?
                            <h1>You Win this round!</h1>
                            :
                            <h1>You Lose this round!</h1>
                        }

                        <div className="game__nextRound">
                            <Button variant="primary" onClick={ () => nextRound() }>
                                Next Round
                            </Button>
                        </div>
                    </FadeInRight>
                }

                {
                    showChat &&
                    <ChatBox 
                        gameId={ gameId } 
                        userName={ activeGame.player2?.userName } 
                        show={ showChat } 
                        chatMessages={ chatMessages }
                        userId={ user.id }
                        challengedId={ activeGame.player2?.id }
                        setChatMessages={ setChatMessages }
                        setNewMessage={ setNewMessage }
                    />
                }
                

                <div className={`game__chatIcon ${ showChat ? 'chat__bubbleRed' : '' } ${ newMessage ? 'chat__newMessage' : ''}`} onClick={ handleChatIconClick }>
                    {
                        <Transition
                            items={ showChat }
                            from={{ opacity: 0, transform: 0 }}
                            enter={{ opacity: 1, transform: 1 }}
                            leave={{ opacity: 0, transform: 0 }}
                            delay={50}
                            config={ { duration: 300 } }
                        >
                            {({ opacity, transform }, item) => 
                                item ? (
                                <animated.div style={{
                                    position: 'absolute',
                                    opacity: opacity.to({
                                        range: [ 0.0, 1.0 ], output: [ 0, 1 ]
                                    }),
                                    transform: transform.to({
                                        range: [ 0.0, 1.0 ], output: [ 'rotate(0deg)', 'rotate(360deg)' ]
                                    })
                                }}>
                                    <MdClose />
                                </animated.div> )
                                :
                                ( <animated.div style={{
                                    position: 'absolute',
                                    opacity: opacity.to({
                                        range: [ 0.0, 1.0 ], output: [ 0, 1 ]
                                    }),
                                    transform: transform.to({
                                        range: [ 0.0, 1.0 ], output: [ 'rotate(0deg)', 'rotate(360deg)' ]
                                    })
                                }}>
                                    <BsFillChatLeftFill />
                                </animated.div> )
                            }
                        </Transition>
                    }
                </div>
            </div>
        )
    }
}
