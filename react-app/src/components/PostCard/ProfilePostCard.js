import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import * as postsActions from '../../store/posts'

import './PostCard.css'
import PostModalPopup from '../Modals/PostModalPopup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart, faCommentAlt as fullComment } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart, faMessage as emptyComment } from '@fortawesome/free-regular-svg-icons';

import { sortByCreatedAt } from '../../utils.js'

export default function ProfilePostCard({ post }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const postImageRef = useRef();
    const [likes, setLikes] = useState([])
    const [isLiked, setIsLiked] = useState(likes?.find(like => like.userId === sessionUser.id) ? true : false);


    // TODO Add likes dropdown to post modal - need user info from all likes in post.postLikes
    useEffect(() => {
        setLikes(() => Object.values(post.postLikes))
        setIsLiked(() => !isLiked);
    }, [post.postLikes])


    const toggleLike = () => {
        dispatch(postsActions.togglePostLike(post.id));
    }

    return (
        <div
            key={post.id}
            className={`post-div`}
        >
            <div className='overlay' onClick={(e) => {
                if (e.currentTarget === e.target) {
                    postImageRef.current.click()
                }
            }}>
                <div className='overlay__button-container'>
                    <div className='centering-container like-container'>
                        <button type='button' onClick={(e) => toggleLike(post?.id)} className={`like-button`}>
                            {isLiked
                                ? (
                                    <FontAwesomeIcon icon={fullHeart} className={`like-icon`} />
                                )
                                : (
                                    <FontAwesomeIcon icon={emptyHeart} className={`like-icon`} />
                                )
                            }
                        </button>
                        <span>{likes.length}</span>
                    </div>

                    <div className='centering-container comment-container'>
                        <FontAwesomeIcon icon={emptyComment} className={`profile__post__icon comment-icon`} />
                        {/* TODO ADD CORRECT COMMENT NUMBER */}
                        <span>{post.comments.length}</span>
                    </div>
                </div>
            </div>

            <PostModalPopup post={post} postImageRef={postImageRef} />
        </div>


    )
}
