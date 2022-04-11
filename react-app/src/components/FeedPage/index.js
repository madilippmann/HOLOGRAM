import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as postsActions from '../../store/posts';
import './FeedPage.css';

import FeedColumn from './FeedColumn';

import { sortByCreatedAt } from '../../utils';
import LoadingSpinner from '../LoadingSpinner';

function FeedPage() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [nextPage, setNextPage] = useState(2);

    let posts = useSelector(state => state.posts);
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

    useEffect(() => {
        const scrolling_function = async () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight + 100) {
                console.log("fetching next page...")
                window.removeEventListener('scroll',scrolling_function);
                await dispatch(postsActions.fetchPosts('feed', null, nextPage));
                setNextPage(prev => prev + 1);
            }
        }
        
        window.addEventListener('scroll', scrolling_function);
        
        return () => {
            window.removeEventListener('scroll', scrolling_function);
        }
    }, [nextPage]);
    
    return !isLoaded ? <LoadingSpinner /> : (
        <div>
            {Object.values(posts).length > 0 ?
                <div id='all-posts'>
                    <FeedColumn column={postsForListOne} />
                    <FeedColumn column={postsForListTwo} />
                    <FeedColumn column={postsForListThree} />
                </div>
                :
                <>
                    <h2 className='no-feed-posts' style={{ fontWeight: 'bolder', fontSize: '25px' }}>Welcome to Hologram</h2>
                    <h4 className='no-feed-posts'>Follow people to start seeing the photos they share</h4>
                </>
            }
        </div>
    );
}

export default FeedPage;
