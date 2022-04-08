import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import * as postsActions from '../../store/posts'
import * as userActions from '../../store/user'
import * as sessionActions from '../../store/session'

import FollowsList from '../FollowsList';
import './ProfilePage.css'

import defaultProfileImage from '../../static/default-profile-image.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import ProfilePostCard from '../PostCard/ProfilePostCard';

import { sortByCreatedAt } from '../../utils';

function ProfilePage() {
    const { handle } = useParams();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.user);
    let posts = useSelector(state => state.posts);

    const [isLoaded, setIsLoaded] = useState(false);
    const [isFollowed, setIsFollowed] = useState();
    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowings, setShowFollowings] = useState(false)
    const [orderedPosts, setOrderedPosts] = useState([])


    useEffect(() => {
        (async () => {
            const user = await dispatch(userActions.fetchUser(handle));
            await dispatch(postsActions.fetchPosts('profile', user.id));
            setIsLoaded(true);
            setIsFollowed(() => sessionUser?.following.find(followed => followed.id === user?.id) ? true : false)


        })()
    }, [dispatch]);

    useEffect(() => {
        setOrderedPosts(() => sortByCreatedAt(Object.values(posts)));
    }, [posts])

    const openFollowers = () => {
        if (showFollowers) return;
        document.querySelector('.sessionUser-followers')
        setShowFollowers(true);
    }

    useEffect(() => {
        // if (showFollowings) setShowFollowings(() => false)
        if (!showFollowers) return;

        const closeFollowers = () => {
            document.querySelector('.sessionUser-followers')
            setShowFollowers(false);
        };

        document.addEventListener('click', closeFollowers);

        return () => {
            setShowFollowers(false);
            document.removeEventListener("click", closeFollowers);
        }

    }, [showFollowers]);


    const openFollowings = () => {
        if (showFollowings) return;
        document.querySelector('.sessionUser-following')
        setShowFollowings(true);
    }

    useEffect(() => {
        // if (showFollowers) setShowFollowers(() => false)
        if (!showFollowings) return;

        const closeFollowings = () => {
            document.querySelector('.sessionUser-followings')
            setShowFollowings(false);
        };

        document.addEventListener('click', closeFollowings);

        return () => {
            setShowFollowings(false);
            document.removeEventListener("click", closeFollowings);
        }

    }, [showFollowings]);


    if (!user) {
        return null;
    }

    const toggleFollow = async () => {
        await dispatch(userActions.toggleUserFollow(user.id));
        await dispatch(sessionActions.fetchUser(sessionUser.handle));
        setIsFollowed(() => !isFollowed);
    }



    return !isLoaded ? null : (
        <div>
            <div className='profile-page user-header'>
                <div className='profile-picture-container'>
                    <img className='profile-picture' src={user.profileImageUrl !== '/default-profile-image.png' ? user.profileImageUrl : defaultProfileImage} alt={`${user.firstName}'s profile preview`} />
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
                                    className='follow-new-post-button true remove-button-styling different-padding'
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
                        <p>{orderedPosts.length} posts</p>
                        <div className='sessionUser-followers'>
                            <button
                                className='remove-button-styling stack'
                                type='button'
                                onClick={openFollowers}
                            >

                                <p className='follows-profile'>{user.followers.length} followers</p>
                            </button>
                            {showFollowers && (
                                <div className="follows-dropdown">
                                    <div className='followers-list'>
                                        <FollowsList follows={user?.followers} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='sessionUser-followings'>
                            <button
                                className='remove-button-styling stack'
                                type='button'
                                onClick={openFollowings}
                            >
                                <p className='follows-profile'>{user.following.length} following</p>
                            </button>
                            {showFollowings && (
                                <div className="follows-dropdown">
                                    <div className='followings-list'>
                                        <FollowsList follows={user?.following} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='name-bio-div'>
                        <h4>{user.firstName} {user.lastName}</h4>
                        <p>{user.bio}</p>
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
