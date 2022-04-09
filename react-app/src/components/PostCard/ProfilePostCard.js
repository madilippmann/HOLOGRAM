import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as postsActions from '../../store/posts'

import './PostCard.css'
import PostModalPopup from '../Modals/PostModalPopup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart, faMessage as emptyComment } from '@fortawesome/free-regular-svg-icons';


export default function ProfilePostCard({ post }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const postImageRef = useRef();
    // const [blurImage, setBlurImage] = useState(false);
    const blurImage = true;
    const [likes, setLikes] = useState(Object.values(post.postLikes))
    const [isLiked, setIsLiked] = useState(likes.find(like => like.userId === sessionUser.id) ? true : false);


    // TODO Add likes dropdown to post modal - need user info from all likes in post.postLikes
    useEffect(() => {
        setLikes(() => Object.values(post.postLikes))
        setIsLiked(() => Object.values(post.postLikes).find(like => like.userId === sessionUser.id) ? true : false);
    }, [post.postLikes])


    const toggleLike = async () => {
        await dispatch(postsActions.togglePostLike(post.id));
    }

    return (
        <div
            key={post.id}
            className={`post-div`}
        // onMouseEnter={e => setBlurImage(true)}
        // onMouseLeave={e => setBlurImage(false)}
        >
            <div className='overlay'>
                <div id='blur-overlay'
                    onClick={(e) => {
                        if (e.currentTarget === e.target) {
                            postImageRef.current.click();
                        }
                    }}
                // onMouseEnter={e => setBlurImage(true)}
                // onMouseLeave={e => setBlurImage(false)}
                // onMouseEnter={e => e.target.classList.add('blur')}
                // onMouseLeave={e => e.target.classList.remove('blur')}
                ></div>

                <div className='overlay__button-container'>
                    <div className='centering-container like-container'>
                        <button type='button' onClick={(e) => toggleLike(post.id)} className={`like-button`}>
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

            <PostModalPopup post={post} postImageRef={postImageRef} blurImage={blurImage} />
        </div>


    )
}
