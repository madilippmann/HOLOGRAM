import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as postsActions from '../../store/posts';
import './PostsList.css';

function PostsList() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    let posts = useSelector(state => state.posts);
    console.log('PostsList ~ posts', Object.values(posts));

    const postsForListOne = [], postsForListTwo = [], postsForListThree = [];
    let counter = 0;

    for(let post of posts.allPosts) {
        switch(counter) {
            case 0:
                postsForListOne.push(post);
                counter++;
                continue;
            case 1:
                postsForListTwo.push(post);
                counter++;
                continue;
            case 2:
                postsForListThree.push(post);
                counter = 0;
                continue;
            default:
                console.error('COULDN\'T PROPERLY ASSIGN POSTS')
        }
    }

    console.log(postsForListTwo)

    useEffect(() => {
        (async () => {
            await dispatch(postsActions.fetchPosts('feed', null));
            setIsLoaded(() => !isLoaded);
        })()
    }, [dispatch]);


    return !isLoaded ? null : (
        <>
            <h1>Post List: </h1>
                {/* <ul>
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
                </ul> */}
            <div id='all-posts'>
                <div className='posts-list'>
                    {postsForListOne.map(post => {
                        return (
                            <div className='single-feed-post' key={post.id}>
                                <div className='post-image-div'>
                                    <img className='post-image' src={post.postImageUrl} alt='there should be something here, bruh'/>
                                </div>
                                <div className='post-info'>
                                    <a href={`/users/${post.userId}/`}>
                                        <div className='user-image-and-handle'>
                                            <img className='user-image' src={post.user.profileImageUrl} alt={post.user.id}/>
                                            <p className='user-handle'>{post.user.handle}</p>
                                        </div>
                                    </a>
                                    <div className='post-like-and-comment-count'>
                                        <p>&#x2665; {post.postLikes.length}</p>
                                        <p>Comments: 2</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='posts-list'>
                    {postsForListTwo.map(post => {
                        return (
                            <div className='single-feed-post' key={post.id}>
                                <div className='post-image-div'>
                                    <img className='post-image' src={post.postImageUrl} alt='there should be something here, bruh'/>
                                </div>
                                <div className='post-info'>
                                    <a href={`/users/${post.userId}/`}>
                                        <div className='user-image-and-handle'>
                                            <img className='user-image' src={post.user.profileImageUrl} alt={post.user.id}/>
                                            <p className='user-handle'>{post.user.handle}</p>
                                        </div>
                                    </a>
                                    <div className='post-like-and-comment-count'>
                                        <p>&#x2665; {post.postLikes.length}</p>
                                        <p>Comments: 2</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='posts-list'>
                    {postsForListThree.map(post => {
                        return (
                            <div className='single-feed-post' key={post.id}>
                                <div className='post-image-div'>
                                    <img className='post-image' src={post.postImageUrl} alt='there should be something here, bruh'/>
                                </div>
                                <div className='post-info'>
                                    <a href={`/users/${post.userId}/`}>
                                        <div className='user-image-and-handle'>
                                            <img className='user-image' src={post.user.profileImageUrl} alt={post.user.id}/>
                                            <p className='user-handle'>{post.user.handle}</p>
                                        </div>
                                    </a>
                                    <div className='post-like-and-comment-count'>
                                        <p>&#x2665; {post.postLikes.length}</p>
                                        <p>Comments: 2</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default PostsList;
