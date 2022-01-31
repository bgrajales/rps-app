import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { IoMdSend } from 'react-icons/io';

import { useForm } from '../../hooks/useForm'
import { socket } from '../../actions/users'

export const ChatBox = ({ gameId, userName, show, chatMessages, userId, challengedId, setChatMessages }) => {

    const [ formValues, handleInputChange, reset ] = useForm({
        message: '',
    })

    const handleSendMessage = (e) => {
        e.preventDefault();

        const message = formValues.message;

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
                date: new Date(),
            }
        ])

        reset();

    }

    socket.on('recieveMessage', (data) => {
    
        setChatMessages([
            ...chatMessages,
            data
        ])

    })

    return <div className={`chat ${ show ? '' : 'd-none'}`}>
        <div className="chat__header">
            <h6>Chat with { userName }</h6>
        </div>
        <div className="chat__box">
            {
                chatMessages.map((message, index) => {
                    return <div key={index} className={`chat__message ${ message.sender === 'player1' ? 'chat__messageOne' : 'chat__messageTwo' }`}>
                        <p>{ message.message }</p>
                    </div>
                })

            }
        </div>

            <InputGroup className="chat__inputText">
                <FormControl
                    placeholder="Type your message here"
                    aria-label="Type your message here"
                    aria-describedby="basic-addon2"
                    value={ formValues.message }
                    onChange={ handleInputChange }
                    name="message"
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={ handleSendMessage }>
                    <IoMdSend />
                </Button>
            </InputGroup>
    </div>
};
