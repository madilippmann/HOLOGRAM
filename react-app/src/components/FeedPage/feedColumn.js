import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart, faCommentAlt as fullComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart, faMessage as emptyComment } from '@fortawesome/free-regular-svg-icons';
import PostModalPopup from '../Modals/PostModalPopup';
import ProfileIcon from '../ProfileIcon';
import './FeedPage.css';

import defaultProfileImage from '../../static/default-profile-image.png'

function FeedColumn({ column }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='posts-list'>
            {column.map(post => {

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
                                        <span><FontAwesomeIcon icon={fullHeart} className={`feed__post__icon`} />{post.postLikes.length}</span>
                                    )
                                    : (
                                        <span><FontAwesomeIcon icon={emptyHeart} className={`feed__post__icon`} />{post.postLikes.length}</span>
                                    )
                                }
                                <span><FontAwesomeIcon icon={emptyComment} className={`feed__post__icon`} />{post.postLikes.length}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default FeedColumn
