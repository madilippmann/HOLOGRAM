import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessagesSidebar from './MessagesSidebar';
import * as threadsActions from '../../store/threads.js';

import io from 'socket.io-client';

const socket = io.connect(`http://localhost:5001/`)

const MessageContainer = ({ thread }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)

    const [prevRoom, setPrevRoom] = useState(1);
    const [newRoom, setNewRoom] = useState(1);
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const [messages, setMessages] = useState([]);


    // disabling the send button when no text
    useEffect(() => {
        if (message.length !== 0 && message.length <= 2000) setDisabled(() => false);
        else setDisabled(() => true);
    }, [message]);

    // start listening to the socket on page load
    useEffect(() => {
        socket.on('message', message => {
            setMessages((messages) => [...messages, message.content])
            console.log('messages inside the socket.on: ', messages)
        })
        
        return (() => socket.disconnect())
    }, []);
    
    // leave old room and join new room
    useEffect(() => {
        socket.emit("on_leave", { handle: sessionUser.handle, room: prevRoom });
        socket.emit("on_join", { handle: sessionUser.handle, room: newRoom });
        setPrevRoom(newRoom);
    }, [newRoom]);
    
    

    const onSubmit = (e) => {
        e.preventDefault()

        const newMessage = {
            content: message,
            // threadId: activeThreadId,
            // userId: sessionUser.id
        }

        socket.send(newMessage)
        setMessage(() => '')
    }

    return (
        <div>
            <h2>Messages</h2>

            <button
                type='button'
                value={newRoom}
                onClick={() => setNewRoom(prev => prev === 1 ? 2 : 1)}
            >
                Room: {newRoom} (Click to switch)
            </button>

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
