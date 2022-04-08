import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart, faComment as emptyComment } from '@fortawesome/free-regular-svg-icons';
import PostModalPopup from '../Modals/PostModalPopup';
import ProfileIcon from '../ProfileIcon';
import * as postsActions from '../../store/posts';
import './PostCard.css'
import { sortByCreatedAt } from '../../utils';

export default function PostCard({ post }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [likes, setLikes] = useState(Object.values(post.postLikes))
    const [isLiked, setIsLiked] = useState(likes.find(like => like.userId === sessionUser.id) ? true : false);
    const [comments, setComments] = useState(Object.values(post.comments))

    // TODO Add likes dropdown to post modal - need user info from all likes in post.postLikes
    useEffect(() => {
        setLikes(() => Object.values(post.postLikes))
        setIsLiked(() => Object.values(post.postLikes).find(like => like.userId === sessionUser.id) ? true : false);
    }, [post.postLikes])

    useEffect(() => {
        setComments(sortByCreatedAt(Object.values(post.comments)))
    }, [post.comments])

    const toggleLike = async (e) => {
        await dispatch(postsActions.togglePostLike(post.id));
    }

    return (
        <div className='single-feed-post' key={post.id}>
            <div className='post-image-div'>
                <PostModalPopup post={post} />
            </div>


            <div className='post-info'>
                <div className='user-image-and-handle'>
                    <div style={{ width: '40px', height: '40px' }}>
                        <ProfileIcon user={post.user} />
                    </div>
                    <span className='user-handle'>{post.user.handle}</span>
                </div>

                <div className='post-like-and-comment-count'>
                    {/* <button type='button' onClick={(e) => toggleLike(post.id)} className={`like-button`}>
                            {isLiked
                                ? (
                                    <FontAwesomeIcon icon={fullHeart} className={`like-icon`} />
                                )
                                : (
                                    <FontAwesomeIcon icon={emptyHeart} className={`like-icon`} />
                                )
                            }
                        </button> */}

                    {!isLiked
                        ? (
                            <span onClick={toggleLike}
                            ><FontAwesomeIcon icon={emptyHeart} className={`like-icon`} />{likes.length}</span>
                        )
                        : (
                            <span onClick={toggleLike}
                            ><FontAwesomeIcon icon={fullHeart} className={`like-icon`} />{likes.length}</span>
                        )
                    }
                    <span><FontAwesomeIcon style={{ cursor: 'default' }} icon={emptyComment} className={`comment-icon`} />{comments.length}</span>
                </div>
            </div>
        </div>

    )
}
