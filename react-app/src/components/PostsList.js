import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as postsActions from '../store/posts'

function PostsList() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    let posts = useSelector(state => state.posts);
    console.log('PostsList ~ posts', posts);

    useEffect(() => {
        // dispatch(postsActions.fetchPosts('feed', null));
        // setIsLoaded(true);
        // .then(res => res.json).then(shouldBePosts => {
        //     posts = shouldBePosts;
        //     console.log('dispatch ~ posts', posts);

        //     return;
        // })
        async function fetchData() {
        //     const response = await fetch('/api/posts/');
        //     const posts = await response.json();
        //     setPosts(posts);

            await dispatch(postsActions.fetchPosts('feed', null));
            console.log('fetchData ~ posts', posts);
            setIsLoaded(() => !isLoaded);
            // console.log(isLoaded)
        }
        fetchData();

    }, [dispatch]);



    const postComponents = posts?.allPosts.map((post) => {
        return (
            <li key={post.id}>
                <p>{post.id}</p>
                <p>{post.userId}</p>
                <p>{post.postImageUrl}</p>
                <p>{post.caption}</p>
            </li>
        );
    });

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
