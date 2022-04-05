import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as postsActions from '../../store/posts'
import * as userActions from '../../store/user'
import * as sessionActions from '../../store/session'


function ProfilePage() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFollowed, setIsFollowed] = useState(user?.followers?.find(user => user.id === sessionUser.id) ? true : false);


    let posts = useSelector(state => state.posts);

    useEffect(() => {
        (async () => {
            await dispatch(postsActions.fetchPosts('profile', userId));
            await dispatch(userActions.fetchUser(userId));
            setIsLoaded(() => !isLoaded);
        })()
    }, [dispatch, userId]);

    if (!user) {
        return null;
    }

    const toggleFollow = (e) => {
        dispatch(userActions.toggleUserFollow(+userId));
        dispatch(sessionActions.fetchUser(sessionUser.id));
        setIsFollowed(() => !isFollowed);
    }


    return !isLoaded ? null : (
        <>
            <ul>
                <li>
                    <strong>User Id</strong> {userId}
                </li>
                <li>
                    <strong>Handle</strong> {user.handle}
                </li>
                <li>
                    <strong>Email</strong> {user.email}
                </li>
                <p>Followers: {user.followers.length}</p>
                <p>Following: {user.following.length}</p>
                <li>
                    {isFollowed
                        ? <button onClick={toggleFollow}>Unfollow</button>
                        : <button onClick={toggleFollow}>Follow</button>
                    }
                </li>
            </ul>
            
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
