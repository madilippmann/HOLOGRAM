import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MessagesSidebar from './MessagesSidebar';


const MessageContainer = () => {
    const sessionUser = useSelector(state => state.sessionUser)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('');
    const [disabled, setDisableSend] = useState(true)

    useEffect(() => {
        if (message.length === 0 || message.length > 2000) setDisableSend(() => false)
    }, [message])

    const onSubmit = (e) => {
        const newMessage = {
            handle: sessionUser.handle,
            content: message
        }

        setMessages((prev) => prev.append(newMessage))
    }

    return (
        <div>
            <h2>Messages</h2>
            <div>
                {messages.map((message) => {
                    return (
                        <div>
                            <p>{message.handle}</p>
                            <p>{message.content}</p>
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
                    disabled={disabled}
                />
                <button type='submit' id='message-submit'>send</button>

            </form>
        </div>
    );
}

export default MessageContainer;
