import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageContainer from './MessageContainer';
import MessagesSidebar from './MessagesSidebar';

import * as threadsActions from '../../store/threads.js';
import './MessagePage.css';

import io from 'socket.io-client';
const socket = io.connect(`http://localhost:5001/`)



const MessagePage = () => {
    // need to get most recent thread
    const dispatch = useDispatch();
    // const threadPreviews = useSelector(state => state.threadPreviews)
    const thread = useSelector(state => state.threads.thread)
    const threadPreviews = useSelector(state => state.threads.threadPreviews)
    const sessionUser = useSelector(state => state.session.user)

    const [currThreadId, setCurrThreadId] = useState(0);
    const [prevThreadId, setPrevThreadId] = useState(0);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            // fetch thread previews
            const threadPreviews = await dispatch(threadsActions.fetchThreadPreviews());
            // fetch the thread that was most recently active
            const thread = await dispatch(threadsActions.fetchThread(threadPreviews[0].threadId));
            // set initial socket room/thread variables
            setCurrThreadId(() => threadPreviews[0].threadId);
            setPrevThreadId(() => threadPreviews[0].threadId);
            // set messages for MessageContainer to display on load
            setMessages(thread.messages)
            setIsLoaded(true);
        })()
    }, [dispatch]);

    // fetch the new room's thread data
    useEffect(() => {
        if (isLoaded) {
            (async () => {
                const thread = await dispatch(threadsActions.fetchThread(currThreadId));
                setMessages(thread.messages)
            })()
        }
    }, [currThreadId]);
    
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

    
    // SOCKETS *******************************************************
    // start listening to the socket on page load
    useEffect(() => {
        socket.on('message', message => {
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

    
    // JSX *********************************************************
    return !isLoaded ? null : (
        <div id='messages-page-container'>
            <div id='messages-sidebar'>
                <MessagesSidebar currThreadId={currThreadId} setCurrThreadId={setCurrThreadId} threadPreviews={threadPreviews} />
            </div>

            <div id='messages-container'>
                <MessageContainer thread={thread} messages={messages} onSubmit={onSubmit} message={message} setMessage={setMessage} disabled={disabled} />
            </div>
        </div>
    );
}

export default MessagePage;
