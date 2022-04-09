import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './MessageContainer.css'

const MessageContainer = ({ messages, currThreadId, onSubmit, message, setMessage, disabled }) => {

    
    return (
        <>
            <h2>Messages Container</h2>
            <h4>Current Room: {currThreadId}</h4>

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
        </>
    );
}

export default MessageContainer;
