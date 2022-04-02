import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as postsActions from '../store/posts'

function Post() {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    let post = useSelector(state => state.posts[postId]);
    console.log('Post ~ posts', post);

    useEffect(() => {
        (async () => {
            await dispatch(postsActions.fetchPost(postId));
            setIsLoaded(() => !isLoaded);
        })()
    }, [dispatch]);


    return !isLoaded ? null : (
        <>
            <p>{post.id}</p>
            <p>{post.userId}</p>
            <p>{post.postImageUrl}</p>
            <p>{post.caption}</p>
        </>
    );
}

export default Post;
