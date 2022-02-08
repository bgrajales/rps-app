import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { MutatingDots, Oval } from 'react-loader-spinner'
import { BsFillChatLeftFill } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'

import styled, { keyframes } from 'styled-components'
import { bounceInDown, bounceInUp, fadeInRight } from 'react-animations'
import { Transition, animated } from 'react-spring'

import { getGameById, goToNextRound, setAiGameHand } from '../../actions/users'
import { ReactComponent as Paper } from '../../assets/images/paper.svg'
import { ReactComponent as Rock } from '../../assets/images/rock.svg'
import { ReactComponent as Scissors } from '../../assets/images/scissors.svg'
import { Player1Choice } from '../uiElements/Player1Choice'
import { Player2Choice } from '../uiElements/Player2Choice'
import { RoundWinnerIndicator } from '../uiElements/RoundWinnerIndicator'
import { ChatBox } from '../uiElements/ChatBox'

const BounceInDown = styled.div`animation: 1s ${keyframes`${bounceInDown}`}`
const BounceInUp = styled.div`animation: 1s ${keyframes`${bounceInUp}`}`
const FadeInRight = styled.div`animation: 1s ${keyframes`${fadeInRight}`}`

export const GameAi = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { gameId } = useParams()

    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)
    const refreshToken = useSelector(state => state.auth.refreshToken)
    
    const [ loader, setLoader ] = useState(true)

    const [ showChat, setShowChat ] = useState(false)
    const [ chatMessages, setChatMessages ] = useState([])
    const [ newMessage, setNewMessage ] = useState(false)

    const [ activeGame, setActiveGame ] = useState({})
    const [ currentRound, setCurrentRound ] = useState()

    useEffect(() => {

        document.body.classList.add('game-page')

        dispatch(getGameById(user.id, gameId, setActiveGame, token, refreshToken, setLoader, setChatMessages, setCurrentRound))

        return () => {
            document.body.classList.remove('game-page')
        }

    }, [ dispatch, gameId, refreshToken, token, user.id ])

    const pickHand = async ( hand ) => {

        await dispatch(setAiGameHand(user.id, gameId, currentRound, hand, token, refreshToken, setActiveGame, activeGame))

    }

    const nextRound = () => {

        dispatch(goToNextRound(user.id, gameId, currentRound, token, refreshToken))

        setCurrentRound(currentRound + 1)

        setActiveGame({
            ...activeGame,
            currentRound: currentRound + 1
        })
    
    }

    const handleChatIconClick = () => {
        setShowChat(!showChat)
        setNewMessage(false)
    }

    if( loader ) {
        return (
            <div className="landing__loader">
            <div className="landing__rpsLoader">
                <MutatingDots ariaLabel="loading-indicator" color={'black'} secondaryColor='black' />
            </div>
            </div>
        )
    }

    return (
        <div className="game__div">
            <BounceInDown>
                <header>
                    <div>
                        <h2>Round {activeGame.rounds[currentRound-1].round}/3</h2>
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
                            activeGame.rounds[currentRound-1].player2hand === 'null' || activeGame.rounds[currentRound-1].player1hand === 'null' ?
                            <div className="game__player2ChoiceNull">
                                <h1>{
                                    activeGame.rounds[currentRound-1].player2hand === 'null' ? 'Waiting for Player 2' : 'Player 2 has picked!'
                                }</h1>
                            </div>
                            :
                            <div className="game__player2ChoicePickand">
                                <Player2Choice hand={ activeGame.rounds[currentRound-1].player2hand } />
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
                            activeGame.rounds[currentRound-1].player1hand === 'null' ?
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
                                <Player1Choice hand={activeGame.rounds[currentRound-1].player1hand} />
                            </div>
                        }
                        </>
                        
                }
                </BounceInUp>
            </div>

            {
                (activeGame.rounds[currentRound-1].round !== 3 && (activeGame.rounds[currentRound-1].player1hand !== 'null' && activeGame.rounds[currentRound-1].player2hand !== 'null')) &&
                <FadeInRight className="game__roundWinner">
                    {
                        activeGame.rounds[currentRound-1].winner === 'player1' ?
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

            {
                activeGame.rounds[currentRound-1].round === 3 && activeGame.rounds[currentRound-1].winner !== 'null' &&
                <FadeInRight className="game__roundWinner">
                    {
                        <Button variant="primary" onClick={ () => navigate(`/app/gameFinish/${gameId}`) }>
                            See game results
                        </Button>    
                    }
                </FadeInRight>
            }
        </div>
    )

}
