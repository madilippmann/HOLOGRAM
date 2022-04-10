import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sortByCreatedAt } from '../../utils.js';
import * as threadsActions from '../../store/threads.js';

import './MessagesSidebar.css';


const MessagesSidebar = ({ currThreadId, setCurrThreadId, threadPreviews }) => {
    // use currThreadId to highlight current thread w/CSS
    const dispatch = useDispatch();

    const createNewThread = async e =>  {
        const thread = await dispatch(threadsActions.createThread([3]))
        console.log("FUCKING SAUCE",thread);
    }

    return (
        <>
            <h2 style={{ margin: 0 }}>Messages Sidebar/Thread Selector</h2>

            <div className='new-message-thread'>
                <div className='user-search'>
                    [new message thread creator goes here]
                </div>

                <div id='selected-users'>
                    <div>[selected users will go here]</div>
                    <button type='button' onClick={createNewThread}>create thread</button>
                </div>
            </div>


            <div className='thread-previews-container'>
                {threadPreviews.map(preview => (
                    <div className='thread-preview'>
                        <h4>{preview.threadName}</h4>
                        <span className='line-clamp'>{preview.preview}</span>
                        <button
                            type='button'
                            onClick={() => setCurrThreadId(preview.threadId)}
                        >
                            {preview.threadName}
                        </button>

                    </div>
                ))}
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
        </>
    );
}

export default MessagesSidebar;
