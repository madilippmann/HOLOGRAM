import { useState, useEffect } from 'react';
import sortByCreatedAt from '../../utils.js';

const MessagesSidebar = ({ threads }) => {


    return (
        <div className='messages-sidebar'>
            <div className='new-message-thread'>
                Start new message Message
            </div>
            <div className='message-thread-list'>
                {threads.map(thread => {
                    const threadParticipants = Object.values(thread.threadParticipants)
                    const threadParticipantNames = thread.threadParticipants.map(participant => participant.firstName);
                    const participantNameString = threadParticipantNames.join(', ');

                    const [messages, setMessages] = useState(sortByCreatedAt(Object.values(thread.meesages)))

                    return (
                        <div className='message-thread-container'>
                            <div>
                                {threadParticipants.length === 1 &&
                                    <div className='overlapped-avatars'>
                                        <img className='avatar-1' src={threadParticipants[0].profileImageUrl} alt={threadParticipants[0].handle} />
                                        <img class='avatar-2' src={threadParticipants[1].profileImageUrl} alt={threadParticipants[1].handle} />
                                    </div>
                                }

                                {threadParticipants.length > 1 &&
                                    <div>
                                        <img className='single-avatar' src={threadParticipants[0].profileImageUrl} alt={threadParticipants[0].handle} />
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

            </div>
        </div>
    );
}

export default MessagesSidebar;
