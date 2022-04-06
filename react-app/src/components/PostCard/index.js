import React from 'react'
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart, faCommentAlt as fullComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart, faMessage as emptyComment } from '@fortawesome/free-regular-svg-icons';
import PostModalPopup from '../Modals/PostModalPopup';
import ProfileIcon from '../ProfileIcon';
import './PostCard.css'

export default function PostCard({ post }) {
    const sessionUser = useSelector(state => state.session.user);
    
    return (
        <div className='single-feed-post' key={post.id}>
            <div className='post-image-div'>
                <PostModalPopup post={post} />
            </div>


            <div className='post-info'>
                <div className='user-image-and-handle'>
                    <div style={{ width: '42px', height: '42px' }}>
                        <ProfileIcon user={post.user} />
                    </div>
                    <span className='user-handle'>{post.user.handle}</span>
                </div>

                <div className='post-like-and-comment-count'>
                    {post.postLikes.find(like => like.userId === sessionUser.id)
                        ? (
                            <span><FontAwesomeIcon icon={fullHeart} className={`like-icon`} />{post.postLikes.length}</span>
                        )
                        : (
                            <span><FontAwesomeIcon icon={emptyHeart} className={`like-icon`} />{post.postLikes.length}</span>
                        )
                    }
                    <span><FontAwesomeIcon icon={emptyComment} className={`comment-icon`} />{post.postLikes.length}</span>
                </div>
            </div>
        </div>

    )
}
