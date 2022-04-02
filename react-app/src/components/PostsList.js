import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as postsActions from '../store/posts'

function PostsList() {
    const dispatch = useDispatch();

    // const [posts, setPosts] = useState([]);
    const posts = useSelector(state => state.posts)

    useEffect(() => {
        dispatch(postsActions.fetchPosts('feed', null))

        // async function fetchData() {
        //     const response = await fetch('/api/posts/');
        //     const posts = await response.json();
        //     setPosts(posts);
        // }
        // fetchData();
    }, [dispatch]);



    const postComponents = posts?.map((post) => {
        return (
            <li key={post.id}>
                <p>{post.id}</p>
                <p>{post.userId}</p>
                <p>{post.postImageUrl}</p>
                <p>{post.caption}</p>
            </li>
        );
    });

    return (
        <>
            <h1>Post List: </h1>
            <ul>{postComponents}</ul>
        </>
    );
}

export default PostsList;
