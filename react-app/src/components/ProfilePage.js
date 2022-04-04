import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as postsActions from '../store/posts'

function ProfilePage() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    let posts = useSelector(state => state.posts);

    useEffect(() => {
        (async () => {
            await dispatch(postsActions.fetchPosts('profile', userId));
            setIsLoaded(() => !isLoaded);
        })()
    }, [dispatch, userId]);


    return !isLoaded ? null : (
        <>
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

export default ProfilePage;
