import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';

import * as postsActions from '../store/posts'

function Post() {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);

    let post = useSelector(state => state.posts[postId]);
    console.log('Post ~ posts', post);

    useEffect(() => {
        (async () => {
            await dispatch(postsActions.fetchPost(postId));
            setIsLoaded(() => !isLoaded);
        })()
    }, [dispatch]);


    const deletePost = (postId) => {
        let res = dispatch(postsActions.deletePost(post.id))
        console.log(res)
        if (res !== 'invalid') {
            // return <Redirect to='/posts/' />
            return history.push('/posts')
        }
    }

    return !isLoaded ? null : (
        <>
            <p>{post.id}</p>
            <p>{post.userId}</p>
            <p>{post.postImageUrl}</p>
            <p>{post.caption}</p>
            <button
                type='button'
                onClick={() => deletePost(post.id)}
            >
                Delete Post
            </button>
        </>
    );
}

export default Post;
