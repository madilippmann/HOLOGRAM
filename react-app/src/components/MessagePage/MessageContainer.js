import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './MessageContainer.css'

const MessageContainer = ({ thread, messages, onSubmit, message, setMessage, disabled }) => {
    const sessionUser = useSelector(state => state.session.user);

    // scroll messages to bottom on load
    useEffect(() => {
        const messagesMap = document.getElementById("messages-map");
        messagesMap.scrollTop = messagesMap.scrollHeight - messagesMap.clientHeight;
        console.log(messagesMap);
    }, [])


    return (
        <div className='messages-inner-container'>
            <div className='messages-header'>
                <h2>Messages Container</h2>
                <h3>{thread.name}</h3>
            </div>

            <div id='messages-map'>
                {messages.map((message) => {
                    return (
                        <div key={message.id} className={message.userId === sessionUser.id ? 'me' : 'friend'}>
                            <h4>{message.user.handle}</h4>
                            <p>{message.content}</p>
                        </div>
                    );
                })}
            </div>

            <form onSubmit={onSubmit} className="message-form">
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
