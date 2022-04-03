import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';

import * as postsActions from '../store/posts'

function Post() {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    let post = useSelector(state => state.posts[postId]);
    let sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    // const [isLiked, setIsLiked] = useState(post.likes.allLikes.find(like => like.userId === sessionUser.id) ? true : false);
    let isLiked = post?.likes?.allLikes.find(like => like.userId === sessionUser.id) ? true : false;

    useEffect(() => {
        (async () => {
            await dispatch(postsActions.fetchPost(postId));
            await dispatch(postsActions.fetchComments(postId));
            setIsLoaded(() => !isLoaded);
        })()
    }, [dispatch]);


    const deletePost = (postId) => {
        let res = dispatch(postsActions.deletePost(post.id))
        console.log(res)
        if (res !== 'invalid') {
            return history.push('/posts')
        }
    }

    const deleteComment = (commentId) => {
        dispatch(postsActions.deleteComment(commentId, post.id))
    }
    
    const toggleLike = (e) => {
        // PURPOSE: this should have the store force a rerender of this component 
        // since the post will (i think?) be updated after toggling the like,
        // since we are subscribed to this specific post in the store
        // dispatch(postActions.togglePostLike(/* , */))
    }

    return !isLoaded ? null : (
        <>
            <p>{post.id}</p>
            <p>{post.userId}</p>
            <img
                src={post.postImageUrl}
                alt="bruh"
            />
            <p>{post.caption}</p>

            {post.id === sessionUser.id &&
                <button
                    type='button'
                    onClick={() => deletePost(post.id)}
                >
                    Delete Post
                </button>
            }
            
            <h2>LIKE COMMENT</h2>
            {isLiked 
                ? <button onClick={toggleLike}>unlike</button>
                : <button onClick={toggleLike}>like</button>
            }
            

            <h2>COMMENTS</h2>
            <ul>
                {post.comments.allComments.map(comment => {
                    console.log(comment);
                    return (
                        <li key={comment.id}>
                            <div>
                                {console.log(comment.user.id, sessionUser.id)}
                                {comment.user.handle} - {comment.content}
                                {comment.user.id === sessionUser.id &&

                                    <>
                                        <Link to={`/posts/${post.id}/comments/${comment.id}/edit`}>Edit</Link>
                                        <button
                                            type='button'
                                            onClick={() => deleteComment(comment.id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                }
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    );
}

export default Post;
