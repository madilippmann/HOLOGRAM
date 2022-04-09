import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MessagesSidebar from './MessagesSidebar';


const MessageContainer = () => {
    const sessionUser = useSelector(state => state.session.user)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (message.length !== 0 && message.length <= 2000) setDisabled(() => false);
        else setDisabled(() => true);
    }, [message])

    const onSubmit = (e) => {
        e.preventDefault()

        const newMessage = {
            handle: sessionUser.handle,
            content: message
        }

        setMessages((prev) => [newMessage, ...prev])
    }

    return (
        <div>
            <h2>Messages</h2>
            <div>
                {messages.map((message) => {
                    return (
                        <div key={message.id}>
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

                />
                <button type='submit' id='message-submit' disabled={disabled}>send</button>

            </form>
        </div>
    );
}

export default MessageContainer;
