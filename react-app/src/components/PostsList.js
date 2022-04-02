import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as postsActions from '../store/posts'

function PostsList() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    let posts = useSelector(state => state.posts);
    console.log('PostsList ~ posts', posts);

    useEffect(() => {
        (async () => {
            await dispatch(postsActions.fetchPosts('feed', null));
            setIsLoaded(() => !isLoaded);
        })()
    }, [dispatch]);


    return !isLoaded ? null : (
        <>
            <h1>Post List: </h1>
                <ul>
                    {posts?.allPosts.map((post) => {
                        return (
                            <li key={post.id}>
                                <p>{post.id}</p>
                                <p>{post.userId}</p>
                                <p>{post.postImageUrl}</p>
                                <p>{post.caption}</p>
                            </li>
                        );
                    })}
                </ul>
        </>
    );
}

export default PostsList;
