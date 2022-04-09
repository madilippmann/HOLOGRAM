import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageContainer from './MessageContainer';
import MessagesSidebar from './MessagesSidebar';

// import { threads } from './fakeThreads.js';

import * as threadsActions from '../../store/threads.js';
import './MessagePage.css';


const MessagePage = () => {
    // need to get most recent thread
    // const dispatch = useDispatch();
    // const threadPreviews = useSelector(state => state.threadPreviews)
    // const thread = useSelector(state => state.thread)

    // const [activeThreadId, setActiveThreadId] = useState(null);
    // const [isLoaded, setIsLoaded] = useState(false);

    // useEffect(() => {
    //     (async () => {
    //         const threadPreviews = await dispatch(threadsActions.fetchThreadPreviews())
    //         setActiveThreadId(() => threadPreviews[0].id)
    //         await dispatch(threadsActions.fetchThread(threadPreviews[0].id));
    //         setIsLoaded(true)
    //     })()

    // }, [dispatch])

    // useEffect(() => {
    //     dispatch(threadsActions.fetchThread(activeThreadId));
    // }, [activeThreadId])


    return /*!isLoaded ? null :*/ (
        <div id='messages-page-container'>
            <div id='messages-sidebar'>
                <MessagesSidebar /*activeThreadId={activeThreadId} setActiveThreadId={setActiveThreadId} threadPreviews={threadPreviews}*/ />
            </div>

            <div id='messages-container'>
                <MessageContainer thread={null} />
            </div>
        </div>
    );
}

export default MessagePage;
