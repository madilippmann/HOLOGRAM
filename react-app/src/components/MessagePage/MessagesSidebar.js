import { useState, useEffect } from 'react';
import { sortByCreatedAt } from '../../utils.js';

const MessagesSidebar = ({ threads }) => {

    // Remember to setActiveThreadId onClick

    return (
        <div className='messages-sidebar'>
            <div className='new-message-thread'>
                Start new message Message
            </div>
            {/* FIX FIX FIXPUT IN ANOTHER COMPONENT */}
            {/* <div className='message-thread-list'>
                {threads.map(thread => {
                    const users = Object.values(thread.users)
                    const userNames = thread.users.map(participant => participant.firstName);
                    const participantNameString = userNames.join(', ');

                    const [messages, setMessages] = useState(sortByCreatedAt(Object.values(thread.meesages)))

                    return (
                        <div className='message-thread-container'>
                            <div>
                                {users.length === 1 &&
                                    <div className='overlapped-avatars'>
                                        <img className='avatar-1' src={users[0].profileImageUrl} alt={users[0].handle} />
                                        <img class='avatar-2' src={users[1].profileImageUrl} alt={users[1].handle} />
                                    </div>
                                }

                                {users.length > 1 &&
                                    <div>
                                        <img className='single-avatar' src={users[0].profileImageUrl} alt={users[0].handle} />
                                    </div>
                                }
                            </div>
                            <div className='message-thread-users limit-text-length'>{participantString}</div>
                            <div className='recent-message-preview limit-text-length'>
                                {messages[0].content}
                            </div>
                        </div>
                    )
                })}

            </div> */}
        </div>
    );
}

export default MessagesSidebar;
