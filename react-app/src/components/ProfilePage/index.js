import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import * as postsActions from '../../store/posts'
import * as userActions from '../../store/user'
import * as sessionActions from '../../store/session'

import './ProfilePage.css'
import PostModalPopup from '../Modals/PostModalPopup';

import defaultProfileImage from '../../static/default-profile-image.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faHeart, faEllipsis, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart as fullHeart, faCommentAlt as fullComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart, faMessage as emptyComment } from '@fortawesome/free-regular-svg-icons';


function ProfilePage() {
    const { handle } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFollowed, setIsFollowed] = useState(sessionUser?.following.find(user => user.id === sessionUser.id) ? true : false);
    const postImageRef = useRef();

    let posts = useSelector(state => state.posts);
    const orderedPosts = [...posts?.allPosts].reverse()

    useEffect(() => {
        (async () => {
            const user = await dispatch(userActions.fetchUser(handle));
            console.log(user);
            await dispatch(postsActions.fetchPosts('profile', user.id));
            setIsLoaded(() => !isLoaded);
            console.log('First render isFollowed: ', isFollowed)
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
                        <h3 className='profile-page-handle' style={{ display: 'inline' }}>{user.handle}</h3>
                        {user.id !== sessionUser.id ?
                            <button
                                className={`follow-new-post-button remove-button-styling ${isFollowed}`}
                                type='button'
                                onClick={toggleFollow}
                            >
                                {isFollowed ? <span>Follow</span> : <span>Unfollow</span>}
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
                {orderedPosts.length === 0 && <p className='no-posts'>No posts to show</p>}

                {orderedPosts.map(post => {
                    return (
                        <div
                            key={post.id}
                            className={`post-div`}
                        >
                            <div className='overlay' onClick={() => postImageRef.current.click()}>
                                <div className='overlay__button-container'>

                                    <div className='centering-container like-container'>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                console.log(post.id)
                                                toggleLike(post?.id)
                                            }}
                                            className={`like-button`}
                                        >
                                            {post.postLikes.find(like => like.userId === sessionUser.id)
                                                ? (
                                                    <FontAwesomeIcon icon={fullHeart} className={`like-icon`} />
                                                )
                                                : (
                                                    <FontAwesomeIcon icon={emptyHeart} className={`like-icon`} />
                                                )
                                            }
                                        </button>

                                        {/* TODO Not automatically re-rendering on change yet */}
                                        <span>{post.postLikes.length}</span>
                                    </div>

                                    <div className='centering-container comment-container'>
                                        <FontAwesomeIcon icon={emptyComment} className={`profile__post__icon comment-icon`} />
                                        {/* TODO ADD CORRECT COMMENT NUMBER */}
                                        <span>4</span>
                                    </div>



                                </div>
                            </div>
                            <PostModalPopup post={post} postImageRef={postImageRef} />
                        </div>

                    )

                })}

            </div>
        </div>
    );
}

export default ProfilePage;
