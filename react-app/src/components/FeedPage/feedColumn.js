import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './FeedPage.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import PostModal from '../Modals/PostModal';

function FeedColumn({ column }) {
    return (
        <div className='posts-list'>
            {column.map(post => {
                
                return (
                    <div className='single-feed-post' key={post.id}>
                        <div className='post-image-div'>
                            <PostModal post={post} />
                            
                        </div>
                        <div className='post-info'>
                            <a href={`/users/${post.userId}/`}>
                                <div className='user-image-and-handle'>
                                    <img className='user-image' src={post.user.profileImageUrl} alt={post.user.id} />
                                    <p className='user-handle'>{post.user.handle}</p>
                                </div>
                            </a>
                            <div className='post-like-and-comment-count'>
                                <p><FontAwesomeIcon icon={faHeart} className={`feed__post__icon`} /> {post.postLikes.length}</p>
                                <p><FontAwesomeIcon icon={faCommentAlt} className='feed__post__icon' />: 2</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default FeedColumn
