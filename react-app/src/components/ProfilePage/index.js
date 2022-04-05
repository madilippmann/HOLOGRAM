import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as postsActions from '../../store/posts'
import * as userActions from '../../store/user'
import * as sessionActions from '../../store/session'

import './ProfilePage.css'
import PostModalPopup from '../Modals/PostModalPopup';

function ProfilePage() {
    const { handle } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFollowed, setIsFollowed] = useState(user?.followers?.find(user => user.id === sessionUser.id) ? true : false);


    let posts = useSelector(state => state.posts);

    useEffect(() => {
        (async () => {
            const user = await dispatch(userActions.fetchUser(handle));
            console.log(user);
            await dispatch(postsActions.fetchPosts('profile', user.id));
            setIsLoaded(() => !isLoaded);
        })()
    }, [dispatch]);

    if (!user) {
        return null;
    }

    const toggleFollow = (e) => {
        dispatch(userActions.toggleUserFollow(user.id));
        dispatch(sessionActions.fetchUser(sessionUser.id));
        setIsFollowed(() => !isFollowed);
    }


    return !isLoaded ? null : (
        <div>
            <div className='profile-page user-header'>
                user profile
            </div>

            <div className='post-image-div profile-page user-posts' >
                {posts.allPosts.map(post => {
                    return (
                        <div key={post.id} className='post-div'>
                            <PostModalPopup post={post} />
                        </div>

                    )
                })}
            </div>
        </div>
    );
}

export default ProfilePage;
