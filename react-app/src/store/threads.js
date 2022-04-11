import { normalizeThreads, normalizeOneLevel } from "./utils";

// ACTION VARIABLES ***************************************
const ADD_THREAD = 'messages/ADD_THREAD';
const LOAD_THREAD = 'messages/LOAD_THREAD'
const ADD_MESSAGE = 'messages/ADD_MESSAGE'
const LOAD_THREAD_PREVIEWS = 'messages/LOAD_THREAD_PREVIEWS'

// ACTION CREATORS ****************************************
const addThread = (thread) => {
    return {
        type: ADD_THREAD,
        thread
    };
};

const loadThread = (thread) => {
    return {
        type: LOAD_THREAD,
        thread
    }
}

const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        message
    }
}

const loadThreadPreviews = (threadPreviews) => {
    return {
        type: LOAD_THREAD_PREVIEWS,
        threadPreviews
    }
}

// THUNK ACTION CREATORS **********************************
export const fetchThread = (threadId) => async (dispatch) => {
    const res = await fetch(`/api/threads/${threadId}/`);

    if (res.ok) {
        const thread = await res.json();
        dispatch(loadThread(thread));
        return thread;
    }
};

export const createThread = (users) => async (dispatch) => {
    const res = await fetch(`/api/threads/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(users)
    });

    if (res.ok) {
        const newThread = await res.json();
        dispatch(addThread(newThread));
        return newThread;
    }
};

export const createMessage = (message) => async (dispatch) => {
    const res = await fetch(`/api/threads/${message.threadId}/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    });

    if (res.ok) {
        const newMessage = await res.json();
        dispatch(addMessage(newMessage));
        return newMessage;
    }
}


export const fetchThreadPreviews = () => async (dispatch) => {
    const res = await fetch(`/api/threads/threadPreviews/`);
    
    if (res.ok) {
        const threadPreviews = await res.json();
        dispatch(loadThreadPreviews(threadPreviews));
        return threadPreviews;
    }
}



// REDUCER ************************************************
const threadsReducer = (state = { thread: {}, threadPreviews: [] }, action) => {

    switch (action.type) {
        case ADD_THREAD: {
            return {
                ...state,
                thread: {
                    ...action.thread,
                    users: { ...normalizeOneLevel(action.thread.users) }
                }
            }
        };

        case LOAD_THREAD: {

            return {
                ...state,
                thread: {
                    ...action.thread,
                    messages: [...action.thread.messages],
                    users: { ...normalizeOneLevel(action.thread.users) }
                }
            }
        }

        case ADD_MESSAGE: {
            return {
                ...state,
                thread: {
                    ...state.thread,
                    messages: [action.message, ...state.thread.messages],
                }
            }
        }
        
        case LOAD_THREAD_PREVIEWS: {
            return {
                ...state,
                threadPreviews: action.threadPreviews,
            }
        }

        default: {
            return state;
        }
    }
};

export default threadsReducer;
