import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessagesSidebar from './MessagesSidebar';
import * as threadsActions from '../../store/threads.js';

import io from 'socket.io-client';

const socket = io.connect(`http://localhost:5001/`)

const MessageContainer = ({ thread }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)

    // const [room, setRoom] = useState(1)
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const [messages, setMessages] = useState([])


    useEffect(() => {
        if (message.length !== 0 && message.length <= 2000) setDisabled(() => false);
        else setDisabled(() => true);
    }, [message])

    // useEffect(() => {
    //     console.log('MESSAGES: ', messages)
    // }, [messages])


    useEffect(() => {
        console.log('entered')
    }, [messages])

    // useEffect(() => { getMessage() }, [messages.length])

    // FIX so that we track previous room and current room (since we will have more than 2 rooms)
    // useEffect(() => {
    //     console.log('CURRENT ROOM: ', room)
    //     leaveRoom(room === 1 ? 2 : 1);
    //     joinRoom(room);
    // }, [room]);
    useEffect(() => {
        socket.on('message', message => {
            setMessages((messages) => [...messages, message.content])
            console.log('Messages: ', messages)

            // setMessages(prev => {
            //     prev[room] = [...prev[room], message.content]
            //     return prev
            // })
        })

        return (() => socket.disconnect())
    }, [])

    const getMessage = () => {
        // socket.on('message', message => {
        //     console.log('Messages: ', messages)
        //     setMessages((messages) => [...messages, message.content])

        //     // setMessages(prev => {
        //     //     prev[room] = [...prev[room], message.content]
        //     //     return prev
        //     // })
        // })
    }



    // const leaveRoom = (room) => {
    //     socket.emit("on_leave", { handle: sessionUser.handle, room });
    // };

    // const joinRoom = (room) => {
    //     socket.emit("on_join", { handle: sessionUser.handle, room });
    // };

    const onSubmit = (e) => {
        e.preventDefault()

        const newMessage = {
            content: message,
            // threadId: activeThreadId,
            // userId: sessionUser.id
        }

        // SEND STUFF TO SOCKET
        // socket.emit('message', newMessage)
        socket.send(newMessage)
        console.log(message)
        // setMessages((messages) => [...messages, message])
        // setMessages(prev => {
        //     prev[room] = [...prev[room], newMessage.content]
        //     return prev
        // })
        setMessage(() => '')
    }

    return (
        <div>
            <h2>Messages</h2>

            {/* <button
                type='button'
                value={room}
                onClick={() => {
                    setRoom(prev => prev === 1 ? 2 : 1)
                }}
            >
                {room}
            </button> */}

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
