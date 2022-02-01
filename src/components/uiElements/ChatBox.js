import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { IoMdSend } from 'react-icons/io';
import ScrollToBottom from 'react-scroll-to-bottom';
import styled, { keyframes } from 'styled-components'
import { bounceInUp } from 'react-animations'

import { useForm } from '../../hooks/useForm'
import { socket } from '../../actions/users'
import { format, parseISO } from 'date-fns';

const BounceInUp = styled.div`animation: 1s ${keyframes`${bounceInUp}`}`

export const ChatBox = ({ gameId, userName, show, chatMessages, userId, challengedId, setChatMessages, setNewMessage }) => {

    const [ formValues, handleInputChange, reset ] = useForm({
        message: '',
    })

    const handleSendMessage = (e) => {
        e.preventDefault();

        const message = formValues.message;

        if( message.length > 0 ) {
            socket.emit('messageSent', {
                gameId,
                userId,
                challengedId,
                message,
            })

            setChatMessages([
                ...chatMessages,
                {
                    sender: 'player1',
                    message,
                    date: new Date().toISOString(),
                }
            ])

        }

        reset();

    }

    return <BounceInUp className={`chat ${ show ? '' : 'd-none'}`}>
        <div className="chat__header">
            <h6>Chat with { userName }</h6>
        </div>
        <ScrollToBottom className="chat__scrollToBottom">
            {
                chatMessages.map((message, index) => {
                    return <span key={index} className={`chat__message ${ message.sender === 'player1' ? 'chat__messageOne' : 'chat__messageTwo' }`}>
                        <span>
                            <p>{ message.message }</p>
                            <p
                                className={
                                    message.sender === 'player1' ?
                                    'chat__messageOne__date' :
                                    'chat__messageTwo__date'
                                }
                            >{ 
                                format(parseISO(message.date), 'dd') === format(new Date(), 'dd') 
                                ? format(parseISO(message.date), 'HH:mm')
                                : format(parseISO(message.date), 'dd MMM HH:mm')
                            }</p>
                        </span>
                        
                    </span>
                })

            }
        </ScrollToBottom>

            <InputGroup className="chat__inputText">
                <FormControl
                    placeholder="Type your message here"
                    aria-label="Type your message here"
                    aria-describedby="basic-addon2"
                    value={ formValues.message }
                    onChange={ handleInputChange }
                    name="message"
                    onKeyPress={ (e) => {
                        if( e.key === 'Enter' ) {
                            handleSendMessage(e);
                        }
                    } }
                />
                <Button 
                    variant="outline-secondary" 
                    id="button-addon2" 
                    onClick={ handleSendMessage }
                >
                    <IoMdSend />
                </Button>
            </InputGroup>
    </BounceInUp>
};
