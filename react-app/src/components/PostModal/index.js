import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as postsActions from '../../store/posts'
import CommentCard from '../CommentCard';
import ProfileIcon from '../ProfileIcon';
import CommentForm from './CommentForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faComment as emptyComment } from '@fortawesome/free-regular-svg-icons'
import EditPostForm from './EditPostForm';
import './PostModal.css'


import { sortByCreatedAt } from '../../utils';

export default function PostModal({ postId, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    let post = useSelector(state => state.posts[postId]);
    // let comments = useSelector(state => state.posts[postId].comments)
    let sessionUser = useSelector(state => state.session.user);

    const [likes, setLikes] = useState(Object.values(post?.postLikes))
    const [orderedComments, setOrderedComments] = useState(Object.values(post?.comments));
    const [isLiked, setIsLiked] = useState(likes.find(like => like.userId === sessionUser.id) ? true : false);
    const [editCaption, setEditCaption] = useState(false);
    const [tick, setTick] = useState(+(post?.timeElapsed.split(' ')[0]) + 1);

    // const [newComment, setNewComment] = useState('');
    // const [chosenEmoji, setChosenEmoji] = useState(null);

    useEffect(() => {
        setOrderedComments(() => sortByCreatedAt(Object.values(post.comments)))
    }, [post.comments])

    // TODO Add likes dropdown to post modal - need user info from all likes in post.postLikes
    useEffect(() => {
        setLikes(() => Object.values(post.postLikes));
        setIsLiked(() => Object.values(post.postLikes).find(like => like.userId === sessionUser.id) ? true : false);
    }, [post.postLikes])

    const deletePost = async () => {
        if (window.confirm('Are you sure you want to delete your post?')) {
            setShowModal(false);
            await dispatch(postsActions.deletePost(post.id));
            return history.push('/');
        }
    }

    useEffect(() => {
        let timer;

        if (tick === 59) {
            timer = setTimeout(() => {
                post.timeElapsed = '1 minute ago';
                setTick(60);
            }, 1000);
            return;
        }

        if (post.timeElapsed.endsWith('seconds ago') || post.timeElapsed.endsWith('second ago')) {
            timer = setTimeout(() => setTick(prev => prev + 1), 1000);
            post.timeElapsed = `${tick + 1} seconds ago`;
        }

        return () => clearTimeout(timer);
    }, [post, tick]);

    const toggleLike = async () => {
        await dispatch(postsActions.togglePostLike(postId));
    }



    return (
        <div className='post-modal-wrapper'>
            <div className='post-image-wrapper'>
                <img
                    src={post.postImageUrl}
                    alt="post"
                />
            </div>

            <div className='post-modal__right'>
                <div id='post-info'>
                    <div className='post-header'>
                        <div className='post-icon' style={{ minWidth: '50px', width: '50px', height: '50px' }}>
                            <ProfileIcon user={post.user} />
                        </div>

                        <div className='post-details-container'>
                            <div className='post-details'>
                                <h4 className='post-user-handle'>{post.user.handle}</h4>
                                {editCaption
                                    ? <EditPostForm post={post} setEditCaption={setEditCaption} />
                                    : <span className='post-caption'>{post.caption}</span>
                                }

                            </div>
                            {sessionUser.id !== post.user.id ? null : (
                                <div className='post-buttons'>
                                    <FontAwesomeIcon id='' icon={faEdit} onClick={() => setEditCaption(!editCaption)} />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deletePost()} />

                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='comment-section'>
                    {orderedComments.length > 0
                        ? (
                            <>
                                {orderedComments.map(comment => {
                                    return (
                                        <div key={comment.id} className='single-comment'>
                                            <CommentCard post={post} comment={comment} />
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <span style={{ color: 'var(--color-gray)', fontSize: '14px' }}>Be the first to leave a comment!</span>
                        )
                    }
                </div>

                <div id='likes-div'>
                    <div id='likes-div-icons'>
                        {!isLiked
                            ? <FontAwesomeIcon icon={faHeart} id='like-button' style={{ fontSize: "20px", cursor: 'pointer' }}
                                onClick={toggleLike}
                            />
                            : <FontAwesomeIcon icon={faHeartSolid} id='like-button' style={{ fontSize: "20px", color: "var(--color-red)", cursor: 'pointer' }}
                                onClick={toggleLike}
                            />
                        }

                        <FontAwesomeIcon icon={emptyComment} id='comment-icon' style={{ fontSize: "20px" }} />
                    </div>

                    <span id='post-like-count'>{likes.length} {likes?.length === 1 ? 'like' : 'likes'}</span>
                    <small id='date-posted' style={{ color: 'var(--color-gray)', fontSize: '12px' }}>{post.timeElapsed}</small>
                </div>

                <div id='create-comment'>
                    <CommentForm postId={postId} />
                </div>
            </div>

        </div>
    );
}
