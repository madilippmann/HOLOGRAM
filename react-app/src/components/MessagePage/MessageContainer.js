import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessagesSidebar from './MessagesSidebar';
import * as threadsActions from '../../store/threads.js';

import io from 'socket.io-client';

const socket = io.connect(`http://localhost:5001/messages/`)

const MessageContainer = ({ thread }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)

    const [room, setRoom] = useState(1)
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const [messages, setMessages] = useState({ 1: [], 2: [] })


    useEffect(() => {
        if (message.length !== 0 && message.length <= 2000) setDisabled(() => false);
        else setDisabled(() => true);
    }, [message])

    useEffect(() => {
        console.log('MESSAGES: ', messages)
    }, [messages])


    useEffect(() => { getMessage() }, [messages.length])

    // FIX so that we track previous room and current room (since we will have more than 2 rooms)
    useEffect(() => {
        console.log('CURRENT ROOM: ', room)
        leaveRoom(room === 1 ? 2 : 1);
        joinRoom(room);
    }, [room]);


    const getMessage = () => {
        socket.on('message', message => {
            setMessages(prev => {
                prev[room] = [...prev[room], message.content]
                return prev
            })
            console.log('Messages: ', messages)
        })
    }



    const leaveRoom = (room) => {
        socket.emit("leave", { room });
    };

    const joinRoom = (room) => {
        socket.emit("join", { room });
    };

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

            <button
                type='button'
                value={room}
                onClick={() => {
                    setRoom(prev => prev === 1 ? 2 : 1)
                }}
            >
                {room}
            </button>

            <div>
                {messages[room].map((message, i) => {
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
