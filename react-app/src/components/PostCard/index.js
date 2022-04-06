import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart, faCommentAlt as fullComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart, faMessage as emptyComment } from '@fortawesome/free-regular-svg-icons';
import PostModalPopup from '../Modals/PostModalPopup';
import ProfileIcon from '../ProfileIcon';
import * as postsActions from '../../store/posts';
import './PostCard.css'

export default function PostCard({ post }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [isLiked, setIsLiked] = useState(post.postLikes.find(like => like.userId === sessionUser.id) ? true : false);
    const [likeCount, setLikeCount] = useState(post.postLikes.length);
    const [commentCount, setCommentCount] = useState(post.postLikes.length);
    
    const toggleLike = (e) => {
        dispatch(postsActions.togglePostLike(post.id));
        setIsLiked(() => !isLiked);
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
                    {isLiked
                        ? (
                            <span onClick={() => {
                                toggleLike();
                                setLikeCount(prev => prev - 1);
                            }}
                            ><FontAwesomeIcon icon={fullHeart} className={`like-icon`} />{likeCount}</span>
                        )
                        : (
                            <span onClick={() => {
                                toggleLike();
                                setLikeCount(prev => prev + 1);
                            }}
                            ><FontAwesomeIcon icon={emptyHeart} className={`like-icon`} />{likeCount}</span>
                        )
                    }
                    <span><FontAwesomeIcon icon={emptyComment} className={`comment-icon`} />{post.postLikes.length}</span>
                </div>
            </div>
        </div>

    )
}
