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
            {posts.length !== 0 ?
                <div id='all-posts'>
                    <FeedColumn column={postsForListOne} />
                    <FeedColumn column={postsForListTwo} />
                    <FeedColumn column={postsForListThree} />
                </div>
            :
            <div id='lonely' style={{height: '50%'}}>
                <p className='no-feed-posts'>Make some friends you lonely piece of shit, waste of space, sack of garbage</p>
                <img style={{height: '700px', margin: 'auto'}} src='https://i.guim.co.uk/img/media/adaffe11119963f6e7046e3fe1d3de1a251fc943/190_532_4878_2927/master/4878.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=db4ea6e3ea43d0ea612bd39ba3982816' alt='temp'/>
                <p className='no-feed-posts'>You look more lonely than her</p>
            </div>
            }
        </>
    );
}

export default FeedPage;
