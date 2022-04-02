import React, { useEffect, useState } from 'react';

function PostsList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/posts/');
            const posts = await response.json();
            setPosts(posts);
        }
        fetchData();
    }, []);

    const postComponents = posts.map((post) => {
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
