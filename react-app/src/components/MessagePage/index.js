import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageContainer from './MessageContainer';
import MessagesSidebar from './MessagesSidebar';

import * as threadsActions from '../../store/threads.js';
import * as postsActions from '../../store/posts.js';
import './MessagePage.css';

import { threads } from './fakeThreads.js';
import io from 'socket.io-client';
const socket = io.connect(`http://localhost:5001/`)



const MessagePage = () => {
    // need to get most recent thread
    const dispatch = useDispatch();
    // const threadPreviews = useSelector(state => state.threadPreviews)
    const thread = useSelector(state => state.thread)
    const sessionUser = useSelector(state => state.session.user)
    
    const [currThreadId, setCurrThreadId] = useState(1);
    const [prevThreadId, setPrevThreadId] = useState(1);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    // useEffect(() => {
    //     (async () => {
    //         const threadPreviews = await dispatch(threadsActions.fetchThreadPreviews())
    //         setCurrThreadId(() => threadPreviews[0].id)
    //         await dispatch(threadsActions.fetchThread(threadPreviews[0].id));
    //         setIsLoaded(true);
    //     })()
    
    // }, [dispatch])

    useEffect(() => {
        (async () => {
            const thread = await dispatch(threadsActions.fetchThread(currThreadId));
            setMessages(thread.messages)
            setIsLoaded(true);
        })()
    }, [currThreadId])
    
    
    // start listening to the socket on page load
    useEffect(() => {
        socket.on('message', message => {
            console.log('message inside the socket.on: ', message)
            setMessages((messages) => [...messages, message])
        })

        return (() => socket.disconnect())
    }, []);

    // leave old room and join new room
    useEffect(() => {
        socket.emit("on_leave", { handle: sessionUser.handle, room: prevThreadId });
        socket.emit("on_join", { handle: sessionUser.handle, room: currThreadId });
        setPrevThreadId(currThreadId);
    }, [currThreadId]);

    // disabling the send button when no text
    useEffect(() => {
        if (message.length !== 0 && message.length <= 2000) setDisabled(() => false);
        else setDisabled(() => true);
    }, [message]);

    // for message form submit
    const onSubmit = async (e) => {
        e.preventDefault()

        let newMessage = {
            threadId: currThreadId,
            userId: sessionUser.id,
            content: message,
        }
        
        newMessage = await dispatch(threadsActions.createMessage(newMessage));
        newMessage.room = currThreadId;
        socket.send(newMessage)
        setMessage(() => '')
    }


    return !isLoaded ? null : (
        <div id='messages-page-container'>
            <div id='messages-sidebar'>
                <MessagesSidebar currThreadId={currThreadId} setCurrThreadId={setCurrThreadId} /*threadPreviews={threadPreviews}*/ />
            </div>

            <div id='messages-container'>
                <MessageContainer currThreadId={currThreadId} messages={messages} onSubmit={onSubmit} message={message} setMessage={setMessage} disabled={disabled} />
            </div>
        </div>
    );
}

export default MessagePage;
