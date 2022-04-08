import { normalizeThreads, normalizeOneLevel } from "./utils";

// ACTION VARIABLES ***************************************
const ADD_THREAD = 'messages/ADD_THREAD';
const LOAD_THREAD = 'messages/LOAD_THREAD'

const LOAD_THREAD_PREVIEWS = 'messages/LOAD_THREAD_PREVIEWS'

const ADD_MESSAGE = 'messages/ADD_MESSAGE'
// const LOAD_MESSAGES = 'messages/LOAD_MESSAGES';

// ACTION CREATORS ****************************************
const addThread = (thread) => {
    return {
        type: ADD_THREAD,
        thread
    };
};

const loadThread = (thread) => {
    return {
        type: LOAD_THREADS,
        thread
    }
}

const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        message
    }
}

// const loadMessages = (threadId) => {
//     return {
//         type: LOAD_MESSAGES,
//         threadId
//     }
// }

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

export const fetchThread = (threadId) => async (dispatch) => {
    const res = await fetch(`/api/threads/${threadId}`);

    if (res.ok) {
        const threads = await res.json();
        dispatch(loadThread(thread));
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


// export const fetchMessages = (threadId) => async (dispatch) => {
//     const res = await fetch(`/api/threads/${threadId}/`);

//     if (res.ok) {
//         const messages = await res.json();
//         dispatch(loadMessages(messages));
//         return;
//     }
// }

state = {
    thread: {
        id: 1,
        name: 'Name1, Name2',
        updatedAt: messages[0].createdAt,
        messages: [
            {
                id: 1,
                userId: 2,
                user: user.to_dict_lite(),
                threadId: 1,
                content: 'This is the message',
                updatedAt: new Date()
            },
        ]
    },

    threadPreviews: [
        {
            id: 1,
            name: 'Name1, Name2',
            preview: 'This is the message'
        },
    ]
}

// Get all thread ids for user
//  Query for first message from each thread id

//  user is in 5 threads
//  get first message from each of those 5 threads
//  threads = Threads.query.filter(Thread.userId == sessionUserId).orderBy(thread.updatedAt)
// threadPreviews = [thread.messages[0].content for thread in threads]


// REDUCER ************************************************
const threadsReducer = (state = { thread: {}, threadPreviews: [] }, action) => {

    switch (action.type) {
        case ADD_THREAD: {
            return {
                ...state,
                [action.thread.id]: {
                    ...action.thread,
                    users: {
                        ...normalizeOneLevel(action.thread.users)
                    }
                }
            }
        };


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

export default threadsReducer;
