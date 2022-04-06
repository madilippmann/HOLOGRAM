import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as postsActions from '../../store/posts'
import * as userActions from '../../store/user'
import * as sessionActions from '../../store/session'

import './ProfilePage.css'
import PostModalPopup from '../Modals/PostModalPopup';

import defaultProfileImage from '../../static/default-profile-image.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faHeart, faEllipsis } from '@fortawesome/free-solid-svg-icons';

function ProfilePage() {
    const { handle } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFollowed, setIsFollowed] = useState(user?.followers?.find(user => user.id === sessionUser.id) ? true : false);

    const [hover, setHover] = useState();

    let posts = useSelector(state => state.posts);
    const orderedPosts = [...posts?.allPosts].reverse()

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

    const toggleLike = (postId) => {
        // PURPOSE: this should have the store force a rerender of this component since the
        // post will be updated after toggling the like, since we are
        // subscribed to this specific post in the store
        dispatch(postsActions.togglePostLike(postId));
        // setIsLiked(() => !isLiked);
    }

    return !isLoaded ? null : (
        <div>
            <div className='profile-page user-header'>
                <div className='profile-picture-container'>
                    <img className='profile-picture' src={user.profileImageUrl !== '/default-profile-image.png' ? user.profileImageUrl : defaultProfileImage} alt={`${user.firstName}'s profile picture`} />
                </div>
                <div className='user-info-container flex-space-between '>
                    <div className='handle-follow-options-div '>
                        <h3 style={{ display: 'inline' }}>{user.handle}</h3>
                        <button type='button'>Follow</button>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                    <div className='posts-followers-following-div flex-gap flex'>
                        <p>{posts.allPosts.length} posts</p>
                        <p>{user.followers.length} followers</p>
                        <p>{user.following.length} following</p>
                    </div>
                    <div className='name-bio-div'>
                        <h4>{user.firstName} {user.lastName}</h4>
                        <p>{user.bio}</p>
                    </div>

                </div>
            </div>

            <div className='post-image-div profile-page user-posts' >
                {orderedPosts.map(post => {

                    return (
                        <div
                            key={post.id}
                            className={`post-div`}

                        >
                            <div className='overlay'>
                                <div className='overlay__div'>
                                    <div className='centering-container like-container'>
                                        <button
                                            type='button'
                                            onClick={() => toggleLike(post.id)}
                                            className={`like-button`}

                                        >
                                            <FontAwesomeIcon icon={faHeart} className={`profile__post__icon ${post.postLikes.includes(post.postLikes.find(like => like.user.id === sessionUser.id))}`} />
                                        </button>
                                        {/* TODO Not automatically re-rendering on change yet */}
                                        <span>{post.postLikes.length}</span>
                                    </div>
                                    <div className='centering-container comment-container'>
                                        <FontAwesomeIcon icon={faCommentAlt} className={`profile__post__icon `} />
                                        {/* TODO ADD CORRECT COMMENT NUMBER */}
                                        <span>4</span>
                                    </div>


                                </div>
                            </div>
                            <PostModalPopup post={post} />
                        </div>

                    )
                })}
            </div>
        </div>
    );
}

export default ProfilePage;
