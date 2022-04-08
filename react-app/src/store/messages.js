// ACTION VARIABLES ***************************************
const ADD_THREAD = 'messages/ADD_THREAD';
const LOAD_THREADS = 'messages/LOAD_THREADS'
const ADD_MESSAGE = 'messages/ADD_MESSAGE'
// const LOAD_MESSAGES = 'messages/LOAD_MESSAGES';

// ACTION CREATORS ****************************************
const addThread = (users) => {
    return {
        type: ADD_USER,
        users
    };
};

const loadThreads = (threads) => {
    return {
        type: LOAD_THREADS,
        threads
    }
}

const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        message
    }
}

const loadMessages = (threadId) => {
    return {
        type: LOAD_MESSAGES,
        threadId
    }
}

// THUNK ACTION CREATORS **********************************
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

export const fetchThreads = () => async (dispatch) => {
    const res = await fetch(`/api/threads/`);

    if (res.ok) {
        const threads = await res.json();
        dispatch(loadThreads(threads));
        return;
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


export const fetchMessages = (threadId) => async (dispatch) => {
    const res = await fetch(`/api/threads/${threadId}/`);

    if (res.ok) {
        const messages = await res.json();
        dispatch(loadMessages(messages));
        return;
    }
}

// REDUCER ************************************************
const messagesReducer = (state = {}, action) => {

    switch (action.type) {
        case ADD_THREAD: {
            return {
                ...state,
                [action.thread.id]: action.thread
            };
        }

        case LOAD_THREADS: {

            return {
                ...normalizeThreads(action.threads)
            }
        }

        case ADD_MESSAGE: {
            return {
                ...state,
                [action.message.threadId]: {
                    messages: [action.message, ...state[action.message.threadId].messages]
                }
            }
        }


        default: {
            return state;
        }
    }
};

export default messagesReducer;
