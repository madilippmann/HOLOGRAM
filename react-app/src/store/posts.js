// import { csrfFetch } from "./csrf"; // ??? WILL WE BE DOING CSRF FETCHES AGAIN ???
import { normalizePosts, normalizeComments } from "./utils";
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

const loadPost = (post) => {
    return {
        type: LOAD_POST,
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
const loadComments = (comments) => {
    return {
        type: LOAD_COMMENTS,
        comments
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

const loadLikes = (likes) => {
    return {
        type: LOAD_LIKES,
        likes
    }
}

const addLike = (like) => {
    return {
        type: ADD_LIKE,
        like
    }
}

const removeLike = (id) => {
    return {
        type: REMOVE_LIKE,
        id
    }
}

// THUNK ACTION CREATORS **********************************

//POSTS THUNKS
export const fetchPost = postId => async dispatch => {
    const res = await fetch(`/api/posts/${postId}`);

    if (res.ok) {
        const post = await res.json();
        dispatch(loadPost(post));
        return post;
    }
}

export const fetchPosts = (type = 'feed', userId = null) => async dispatch => {
    let res;

    if (type === 'feed') {
        res = await fetch(`/api/posts`);
    } else if (type === 'profile') {
        res = await fetch(`/api/users/${userId}/posts`);
    }

    if (res.ok) {
        const posts = await res.json();
        dispatch(loadPosts(posts));
        return posts;
    }
}

export const createPost = post => async dispatch => {
    console.log(post);
    const res = await fetch('/api/posts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });

    console.log(res);

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
        console.log(
            editedPost
        )
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
        dispatch(loadComments(comments));
        return comments;
    }
}

export const createComment = comment => async dispatch => {
    console.log('ENTERED CREATE COMMENT')
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
        const { commentId } = await res.json();
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
        const like = await res.json();
        if (like === 'deleted') {
            dispatch(removeLike(like));
        } else {
            dispatch(addLike(like));
        }
        return like;
    }
}

export const fetchPostLikes = (postId) => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/likes/`);
    
    if (res.ok) {
        const likes = await res.json();
        // what if there are no likes?
        dispatch(loadLikes(likes));
        return likes;
    }
}


// REDUCER ************************************************
const postsReducer = (state = { allPosts: [] }, action) => {


    let newState;

    switch (action.type) {

        case ADD_POST: {
            const newState = { ...state };
            newState[action.post.id] = action.post;

            return newState;
        }

        case LOAD_POST: {
            const newState = {
                ...state,
                allPosts: [action.post, ...state.allPosts]
            };
            newState[action.post.id] = action.post;
            return newState;
        }

        case LOAD_POSTS: {
            return {
                ...state,
                ...normalizePosts(action.posts),
                allPosts: [...action.posts]
            };
        }

        case REMOVE_POST: {

            newState = {
                ...state,
                allPosts: [...state.allPosts]
            };

            newState.allPosts.splice(newState.allPosts.indexOf(newState.allPosts.find(post => post.id === action.postId)))

            delete newState[action.postId];
            return newState;
        }

        // COMMENTS ***********************************************************
        case ADD_COMMENT: {
            const postId = action.comment.postId
            const allComments = Array.isArray(state[postId].comments?.allComments) ? [...state[postId].comments?.allComments] : [];

            return {
                ...state,
                [postId]: {
                    ...state[postId],
                    comments: {
                        ...state[postId].comments,
                        [action.comment.id]: action.comment,
                        allComments: [action.comment, ...allComments]
                    }
                }
            }
        }

        case LOAD_COMMENTS: {
            const postId = action.comments[0].postId

            return {
                ...state,
                [postId]: {
                    ...state[postId],
                    comments: {
                        ...normalizeComments(action.comments),
                        allComments: action.comments

                    }
                }
            }

        }

        case REMOVE_COMMENT: {
            const allComments = state[action.postId].comments.allComments
            allComments.splice(allComments.indexOf(allComments.find(comment => comment.id === action.commentId)))

            newState = {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    comments: {
                        ...state[action.postId].comments,
                        allComments
                    }
                }
            }

            delete newState[action.postId].comments[action.commentId]

            return newState
        }
        
        // COMMENTS ***********************************************************
        case ADD_LIKE: {
            const postId = action.like.postId
            const allLikes = Array.isArray(state[postId].likes?.allLikes) ? [...state[postId].likes?.allLikes] : [];

            return {
                ...state,
                [postId]: {
                    ...state[postId],
                    likes: {
                        ...state[postId].likes,
                        [action.like.id]: action.like,
                        allLikes: [action.like, ...allLikes]
                    }
                }
            }
        }
        
        case LOAD_LIKES: {
            // need to load likes on Post Page load so that 'isLiked' can be set properly.
            // 'isLiked' is not getting set properly since the like cant be found inside the post in store on refresh.
            // the like is there once ADD_LIKE is ran, but goes away on refresh, since the 'likes' property hasn't been set yet
            // the 'postLikes' property inside a post in the store is from the Post.to_dict() method:
                // should probably get rid of this once LOAD_LIKES is implemented, maybe?
                // FYI 'postLikes' does have the new like once you like a post and refresh
        }
        
        case REMOVE_LIKE: {
            
        }

        default: {
            return state;
        }
    }

};

export default postsReducer;
