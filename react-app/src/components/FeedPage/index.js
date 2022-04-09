import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as postsActions from '../../store/posts';
import './FeedPage.css';

import FeedColumn from './FeedColumn';

import { sortByCreatedAt } from '../../utils';
import LoadingSpinner from '../LoadingSpinner';

function FeedPage() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    let posts = useSelector(state => state.posts);
    console.log('FeedPage ~ posts', posts);
    const [orderedPosts, setOrderedPosts] = useState([]);

    useEffect(() => {
        (async () => {
            await dispatch(postsActions.fetchPosts('feed', null));
            setIsLoaded(() => !isLoaded);
        })()
    }, [dispatch]);

    useEffect(() => {
        setOrderedPosts(() => sortByCreatedAt(Object.values(posts)));
    }, [posts])

    const postsForListOne = [], postsForListTwo = [], postsForListThree = [];
    let counter = 0;

    for (let post of orderedPosts) {
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


    return !isLoaded ? <LoadingSpinner /> : (
        <>
            {Object.values(posts).length > 0 ?
                <div id='all-posts'>
                    <FeedColumn column={postsForListOne} />
                    <FeedColumn column={postsForListTwo} />
                    <FeedColumn column={postsForListThree} />
                </div>
            :
                <>
                    <h2 className='no-feed-posts' style={{fontWeight: 'bolder', fontSize: '25px'}}>Welcome to Hologram</h2>
                    <h4 className='no-feed-posts'>Follow people to start seeing the photos they share</h4>
                </>
            }
        </>
    );
}

export default FeedPage;
