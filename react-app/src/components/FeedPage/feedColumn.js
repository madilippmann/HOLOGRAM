import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import './FeedPage.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import PostModalPopup from '../Modals/PostModalPopup';

import defaultProfileImage from '../../static/default-profile-image.png'

function FeedColumn({ column }) {

    return (
        <div className='posts-list'>
            {column.map(post => {

                return (
                    <div className='single-feed-post' key={post.id}>
                        <div className='post-image-div'>
                            <PostModalPopup post={post} />
                        </div>
                        <div className='post-info'>
                            <Link to={`/${post.user.handle}/`}>
                                <div className='user-image-and-handle'>
                                    <img className='user-image' src={post.user.profileImageUrl !== '/default-profile-image.png' ? post.user.profileImageUrl : defaultProfileImage} alt={post.user.id} />
                                    <p className='user-handle'>{post.user.handle}</p>
                                </div>
                            </Link>
                            <div className='post-like-and-comment-count'>
                                <p className='post-like'
                                    style={{ 'color': '#818080', 'textAlign': 'center', 'top': '100%' }}
                                ><FontAwesomeIcon icon={faHeart} className={`feed__post__icon`} /> {post.postLikes.length}</p>
                                <p className='post-comment'
                                    style={{ 'color': '#818080', 'textAlign': 'center', 'marginBottom': '5px' }}
                                ><FontAwesomeIcon icon={faCommentAlt} className='feed__post__icon' /> 2</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default FeedColumn
