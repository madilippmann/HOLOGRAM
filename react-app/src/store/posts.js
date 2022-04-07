// import { csrfFetch } from "./csrf"; // ??? WILL WE BE DOING CSRF FETCHES AGAIN ???
import { normalizePosts, normalizeOneLevel } from "./utils";
// ACTION VARIABLES ***************************************
const ADD_POST = 'posts/ADD_POST';
const LOAD_POST = 'posts/LOAD_POST';
const LOAD_POSTS = 'posts/LOAD_POSTS';
const REMOVE_POST = 'posts/REMOVE_POST';

const ADD_COMMENT = 'comments/ADD_COMMENT';
const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';

const LOAD_LIKES = 'likes/LOAD_LIKES'
const ADD_LIKE = 'likes/ADD_LIKE';
const REMOVE_LIKE = 'likes/REMOVE_LIKE';

// ACTION CREATORS ****************************************

// POSTS
const addPost = (post) => {
    return {
        type: ADD_POST,
        post
    }
}


const loadPosts = (posts) => {
    return {
        type: LOAD_POSTS,
        posts
    }
}

const removePost = (postId) => {
    return {
        type: REMOVE_POST,
        postId
    }
}

// COMMENTS

// For adding new comment and updating existing comments
// POST PUT
const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

// GET
const loadComments = (comments, postId) => {
    return {
        type: LOAD_COMMENTS,
        comments,
        postId
    }
}

// DELETE
const removeComment = (postId, commentId) => {
    return {
        type: REMOVE_COMMENT,
        postId,
        commentId
    }
}



// LIKES

const addLike = (like) => {
    return {
        type: ADD_LIKE,
        like
    }
}

const removeLike = (postId, likeId) => {
    return {
        type: REMOVE_LIKE,
        postId,
        likeId
    }
}

// THUNK ACTION CREATORS **********************************

//POSTS THUNKS

export const fetchPosts = (type = 'feed', userId = null) => async dispatch => {
    let res;

    if (type === 'feed') {
        res = await fetch(`/api/posts/`);
    } else if (type === 'profile') {
        res = await fetch(`/api/users/${userId}/posts/`);
    }

    if (res.ok) {
        const posts = await res.json();
        dispatch(loadPosts(posts));
        return posts;
    }
}

export const createPost = post => async dispatch => {
    const res = await fetch('/api/posts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });



    if (res.ok) {
        const newPost = await res.json();
        dispatch(addPost(newPost));
        return newPost;
    }
}

export const editPost = post => async dispatch => {
    const res = await fetch(`/api/posts/${post.id}/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });

    if (res.ok) {
        const editedPost = await res.json();
        console.log('editedPost', editedPost);

        dispatch(addPost(editedPost));
        return editedPost;
    }
}

export const deletePost = (postId) => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/`, {
        method: 'DELETE',
    });

    if (res.ok) {
        const postId = await res.json();
        if (postId) {
            dispatch(removePost(postId));
            return postId;
        }
    }
}


// COMMENTS THUNKS
export const fetchComments = postId => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/comments/`);

    if (res.ok) {
        const comments = await res.json();
        dispatch(loadComments(comments, postId));
        return comments;
    }
}

export const createComment = comment => async dispatch => {
    const res = await fetch(`/api/posts/${comment.postId}/comments/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });

    if (res.ok) {
        const newComment = await res.json();
        dispatch(addComment(newComment));
        return newComment;
    }
}

export const editComment = comment => async dispatch => {
    const res = await fetch(`/api/posts/${comment.postId}/comments/${comment.id}/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });

    if (res.ok) {
        const editedComment = await res.json();
        dispatch(addComment(editedComment));
        return editedComment;
    }
}

export const deleteComment = (commentId, postId) => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/comments/${commentId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const commentId = await res.json();
        dispatch(removeComment(postId, commentId));
        return { postId, commentId };
    }
}


// LIKES
export const togglePostLike = (postId) => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/like/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (res.ok) {
        const data = await res.json();
        if (data.status === 'deleted') {
            dispatch(removeLike(data.postId, data.likeId));
        } else {
            dispatch(addLike(data));
        }
        return data;
    }
}



// REDUCER ************************************************
const postsReducer = (state = { allPosts: [] }, action) => {


    let newState;

    switch (action.type) {

        case ADD_POST: {
            const newState = { ...state };
            newState[action.post.id] = { ...action.post };

            return newState;
        }

        case LOAD_POSTS: {
            return {
                ...state,
                ...normalizePosts(action.posts),
            };
        }

        case REMOVE_POST: {

            newState = {
                ...state,
            };

            delete newState[action.postId];
            return newState;
        }

        // COMMENTS ***********************************************************
        case ADD_COMMENT: {
            const postId = action.comment.postId

            return {
                ...state,
                [postId]: {
                    ...state[postId],
                    comments: {
                        ...state[postId].comments,
                        [action.comment.id]: action.comment,
                    }
                }
            }
        }

        case LOAD_COMMENTS: {
            const postId = action.postId

            return {
                ...state,
                [postId]: {
                    ...state[postId],
                    comments: {
                        ...normalizeOneLevel(action.comments),
                    }
                }
            }

        }

        case REMOVE_COMMENT: {
            // this takes care of deleting from the "allComments" array...


            newState = {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    comments: {
                        ...state[action.postId].comments,
                    }
                }
            }

            // and this takes care of deleting from the normalized "comments" object
            delete newState[action.postId].comments[action.commentId]

            return newState
        }

        // LIKES ***********************************************************

        case ADD_LIKE: {
            const postId = action.like.postId

            return {
                ...state,
                [postId]: {
                    ...state[postId],
                    postLikes: {
                        ...state[postId].postLikes,
                        [action.like.id]: action.like,
                    }
                }
            }
        }

        case REMOVE_LIKE: {

            newState = {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    postLikes: {
                        ...state[action.postId].postLikes
                    }
                }
            }

            delete newState[action.postId].postLikes[action.likeId];
            return newState;
        }

        default: {
            return state;
        }
    }

};

export default postsReducer;
