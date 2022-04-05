import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as postsActions from '../../store/posts';
import './Feed.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import FeedColumn from './feedColumn';

function Feed() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    let posts = useSelector(state => state.posts);
    console.log('PostsList ~ posts', Object.values(posts));

    const postsForListOne = [], postsForListTwo = [], postsForListThree = [];
    let counter = 0;

    for (let post of posts.allPosts) {
        switch (counter) {
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

            <div id='all-posts'>
                <FeedColumn column={postsForListOne} />
                <FeedColumn column={postsForListTwo} />
                <FeedColumn column={postsForListThree} />
            </div>
        </>
    );
}

export default Feed;
