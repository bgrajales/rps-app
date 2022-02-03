import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { BsFillChatLeftFill } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import { FaTrophy } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Transition, animated } from 'react-spring'
import { MutatingDots } from 'react-loader-spinner';

import { finishGameAction, getActiveGame, socket } from '../../actions/users';
import { PlayerChoiceResume } from '../uiElements/PlayerChoiceResume'
import { Button } from 'react-bootstrap';
import { ChatBox } from '../uiElements/ChatBox';

export const GameFinish = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)
    const refreshToken = useSelector(state => state.auth.refreshToken)

    const { gameId } = useParams()
    const [ activeGame, setActiveGame ] = useState({})
    const [ winner, setWinner ] = useState('')
    const [ loader, setLoader ] = useState(true)

    const [ showChat, setShowChat ] = useState(false)
    const [ chatMessages, setChatMessages ] = useState([])
    const [ newMessage, setNewMessage ] = useState(false)

    useEffect(() => {

        dispatch( getActiveGame( user.id, gameId, setActiveGame, token, refreshToken, setChatMessages, setLoader, setWinner ))

    }, [user.id, gameId, refreshToken, token, dispatch])

    const handleChatIconClick = () => {
        setShowChat(!showChat)
        setNewMessage(false)
    }

    const finishGame = ( ) => {
        console.log('finish game', user.id, activeGame.id)

        dispatch(finishGameAction( user.id, activeGame.id, token, refreshToken ))

        setTimeout(() => {
            sessionStorage.setItem('lastPath', `/app/home`)
            navigate('/app/home')
        }, 1000)
    }

    socket.on('recieveMessage', (data) => {
    
        setChatMessages([
            ...chatMessages,
            data
        ])

        if( !showChat ) {
            setNewMessage(true);
        }

    })

    return (
        <div className="base__div">
            <div className="game__nameVsDiv">
                    <h1 className={
                        winner === 'player1' ?
                        'game__winner'
                        :
                        ''                        
                    }>
                        {
                            activeGame.player1?.userName
                        }
                        {
                            winner === 'player1' &&
                            <FaTrophy />
                        }
                    </h1>
                    <h1>VS</h1>
                    <h1 className={
                        winner === 'player2' ?
                        'game__winner'
                        :
                        ''                        
                    }>
                        {
                            activeGame.player2?.userName
                        }
                        {
                            winner === 'player2' &&
                            <FaTrophy />
                        }
                    </h1>
            </div>   

                <div className="game__parent">
                    <div className="game__div1">
                        {
                            activeGame.rounds?.map( ( round, index ) => {
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
                    
                   
                    <div className="game__div2">
                        {
                            activeGame.rounds?.map( ( round, index ) => {
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

                <Button onClick={ finishGame } className="container" style={{
                    width: '80%',
                }}>
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
                    loader === true ?
                    <div className="landing__loader">
                    <div className="landing__rpsLoader">
                        <MutatingDots ariaLabel="loading-indicator" color={'black'} secondaryColor='black' />
                    </div>
                    </div>
                    :
                    null
                }
        </div>
    );
};
