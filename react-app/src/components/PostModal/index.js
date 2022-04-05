import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';

import * as postsActions from '../../store/posts'
import CommentCard from '../CommentCard';

export default function PostModal({ postId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    let post = useSelector(state => state.posts[postId]);
    let sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLiked, setIsLiked] = useState(post?.likes?.allLikes.find(like => like.userId === sessionUser.id) ? true : false);

    useEffect(() => {
        (async () => {
            await dispatch(postsActions.fetchComments(postId));
            await dispatch(postsActions.fetchPostLikes(postId));
            setIsLoaded(() => !isLoaded);
        })()
    }, [dispatch]);


    const deletePost = () => {
        let res = dispatch(postsActions.deletePost(post.id))
        console.log(res)
        if (res !== 'invalid') {
            return history.push('/posts')
        }
    }

    const toggleLike = (e) => {
        // PURPOSE: this should have the store force a rerender of this component since the
        // post will be updated after toggling the like, since we are
        // subscribed to this specific post in the store
        dispatch(postsActions.togglePostLike(postId));
        setIsLiked(() => !isLiked);
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

            {post.userId === sessionUser.id &&
                <button
                    type='button'
                    onClick={() => deletePost()}
                >
                    Delete Post
                </button>
            }

            <h2># of Likes: {post.likes.allLikes.length}</h2>
            {isLiked
                ? <button onClick={toggleLike}>unlike</button>
                : <button onClick={toggleLike}>like</button>
            }


            <h2>COMMENTS</h2>
            <ul>
                {post.comments.allComments.map(comment => {
                    return (
                        <li key={comment.id}>
                            <CommentCard post={post} comment={comment} />
                        </li>
                    )
                })}
            </ul>
        </>
    );
}