import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessagesSidebar from './MessagesSidebar';
import * as threadsActions from '../../store/threads.js';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:5001/messages')

const MessageContainer = ({ thread }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)

    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (message.length !== 0 && message.length <= 2000) setDisabled(() => false);
        else setDisabled(() => true);
    }, [message])

    useEffect(() => { getMessage() }, [messages.length])

    const getMessage = () => {
        socket.on('message', message => {
            setMessages([...messages, message.content]);
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const newMessage = {
            content: message,
            // threadId: activeThreadId,
            // userId: sessionUser.id
        }

        // SEND STUFF TO SOCKET
        socket.emit('message', newMessage)
        console.log(message)
        // setMessages((messages) => [...messages, message])
        setMessage(() => '')
    }

    return (
        <div>
            <h2>Messages</h2>
            <div>
                {messages.map((message, i) => {
                    return (
                        <div key={i}>
                            <p>{message}</p>
                        </div>
                    );
                })}
            </div>

            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    placeholder='start message...'

                />
                <button type='submit' id='message-submit' disabled={disabled}>send</button>

            </form>
        </div>
    );
}

export default MessageContainer;
