import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import * as postsActions from '../../store/posts'
import * as userActions from '../../store/user'
import * as sessionActions from '../../store/session'

import './ProfilePage.css'

import defaultProfileImage from '../../static/default-profile-image.png'


import ProfilePostCard from '../PostCard/ProfilePostCard';



function ProfilePage() {
    const { handle } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.user);
    const [isLoaded, setIsLoaded] = useState(false);

    const [isFollowed, setIsFollowed] = useState();
    const postImageRef = useRef();


    let posts = useSelector(state => state.posts);
    const orderedPosts = [...posts?.allPosts].reverse()

    useEffect(() => {
        (async () => {
            const user = await dispatch(userActions.fetchUser(handle));
            await dispatch(postsActions.fetchPosts('profile', user.id));
            setIsLoaded(true);
            setIsFollowed(() => sessionUser?.following.find(followed => followed.id === user?.id) ? true : false)


        })()
    }, [dispatch]);

    if (!user) {
        return null;
    }

    const toggleFollow = async () => {
        const follow = await dispatch(userActions.toggleUserFollow(user.id));
        await dispatch(sessionActions.fetchUser(sessionUser.handle));
        setIsFollowed(() => !isFollowed);
        console.log("FOLLOW: ", isFollowed)

    }



    return !isLoaded ? null : (
        <div>
            <div className='profile-page user-header'>
                <div className='profile-picture-container'>
                    <img className='profile-picture' src={user.profileImageUrl !== '/default-profile-image.png' ? user.profileImageUrl : defaultProfileImage} alt={`${user.firstName}'s profile picture`} />
                </div>
                <div className='user-info-container flex-space-between '>
                    <div className='handle-follow-options-div '>
                        <h3 className='profile-page-handle' style={{ display: 'inline' }}>{user.handle}</h3>
                        {user.id !== sessionUser.id ?
                            <button
                                className={`follow-new-post-button remove-button-styling ${isFollowed}`}
                                type='button'
                                onClick={toggleFollow}
                            >
                                {isFollowed ? <span>Unfollow</span> : <span>Follow</span>}
                            </button> :
                            <Link to='/posts/new'>
                                <button
                                    type='button'
                                    className='follow-new-post-button remove-button-styling different-padding'
                                >
                                    <FontAwesomeIcon icon={faPlus}
                                        style={{ paddingLeft: '0', paddingRight: '10px' }}
                                    />
                                    New Post
                                </button>
                            </Link>
                        }
                        {/* <button className='remove-button-styling' type='button'>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </button> */}
                    </div>
                    <div className='posts-followers-following-div flex-gap flex'>
                        <p>{posts.allPosts.length} posts</p>
                        <p>{user.followers.length} followers</p>
                        <p>{user.following.length} following</p>
                    </div>
                    <div className='name-bio-div'>
                        <h4>{user.firstName} {user.lastName}</h4>
                        {/* <p>{user.bio}</p> */}
                        <p>This is a temporary bio</p>
                    </div>

                </div>
            </div>

            <div className='post-image-div profile-page user-posts' >
                {orderedPosts.map(post => (
                    <ProfilePostCard post={post} />
                ))}
                {orderedPosts.length === 0 && <p className='no-posts'>No posts to show</p>}
            </div>
        </div>
    );
}

export default ProfilePage;
