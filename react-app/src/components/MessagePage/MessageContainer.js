import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTimeElapsed } from '../../utils';
import './MessageContainer.css'

import defaultProfileImage from '../../static/default-profile-image.png'
import { UilMessage } from '@iconscout/react-unicons';

const MessageContainer = ({ thread, messages, onSubmit, message, setMessage, disabled }) => {
    const sessionUser = useSelector(state => state.session.user);

    // scroll messages to bottom on load
    useEffect(() => {
        const messagesMap = document.getElementById("messages-map");
        messagesMap.scrollTop = messagesMap.scrollHeight - messagesMap.clientHeight;
        // console.log(messagesMap);
    }, [])

    const threadUserNames = () => {
        let users = Object.values(thread.users)
        console.log('USERS: ', users)
        const names = users.map(user => user.firstName)
        return names.join(', ')
    }


    return (
        <div className='messages-inner-container'>
            <div className='messages-header'>
                <h2 className='thread-name'>{threadUserNames()}</h2>
            </div>

            <div id='messages-map'>
                {messages.map((message) => {
                    return (
                        <div key={message.id} id='message-container' className={message.userId === sessionUser.id ? 'me' : 'friend'}>
                            <div className='message__name-and-date'>
                                <h4 className='message__name'>{message.user.firstName}</h4>
                                <h6 className='message__date'>{getTimeElapsed(message.createdAt)}</h6>
                            </div>
                            <div className='message-and-avatar'>
                                <div className='message__avatar'>
                                    <img
                                        src={message.user.profileImageUrl !== '/default-profile-image.png' ? message.user.profileImageUrl : defaultProfileImage}
                                        alt="profile preview"
                                    />
                                </div>
                                <p className='message__content'>{message.content}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <form onSubmit={onSubmit} className="message-form">
                <div className='input__container'>
                    <input
                        type='text'
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        placeholder='start message...'

                    />
                    {/* {message.length ?
                        <button type='submit' id='message-submit' disabled={disabled}>
                            <UilMessage size='25' />
                        </button>
                        : null
                    } */}

                    <button type='submit' id='message-submit' disabled={disabled} className={`${disabled}`}>
                        <UilMessage size='25' id='send-icon' />
                    </button>


                </div>

            </form>
        </div>
    );
}

export default MessageContainer;
