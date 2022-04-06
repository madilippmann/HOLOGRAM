import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import * as postsActions from '../../store/posts'
import CommentCard from '../CommentCard';
import ProfileIcon from '../ProfileIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import EditPostForm from './EditPostForm';
import './PostModal.css'


export default function PostModal({ postId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    let post = useSelector(state => state.posts[postId]);
    let sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLiked, setIsLiked] = useState(post?.likes?.allLikes.find(like => like.userId === sessionUser.id) ? true : false);
    const [editCaption, toggleEditCaption] = useState(false);
    const [likeCount, setLikeCount] = useState(post?.likes?.allLikes?.length)

    useEffect(() => {
        (async () => {
            await dispatch(postsActions.fetchComments(postId));
            await dispatch(postsActions.fetchPostLikes(postId));
            setIsLoaded(() => !isLoaded);
        })()
    }, [dispatch]);


    const deletePost = async () => {
        if (window.confirm('Are you sure you want to delete your post?')) {
            await dispatch(postsActions.deletePost(post.id))
            return history.push('/')
        }
    }

    const toggleLike = (e) => {
        // PURPOSE: this should have the store force a rerender of this component since the
        // post will be updated after toggling the like, since we are
        // subscribed to this specific post in the store
        dispatch(postsActions.togglePostLike(postId));
        setIsLiked(() => !isLiked);
    }

    return !isLoaded ? null : (
        <div className='post-modal-wrapper'>
            <div className='post-image-wrapper'>
                <img
                    src={post.postImageUrl}
                    alt="bruh"
                />
            </div>

            <div className='post-modal__right'>
                <div className='post-header'>
                    <div className='post-icon' style={{ minWidth: '50px', width: '50px' }}>
                        <ProfileIcon user={post.user} />
                    </div>

                    <div className='post-details-container'>
                        <div className='post-details'>
                            <h4 className='post-user-handle'>{post.user.handle}</h4>
                            {/* <span className='post-caption' id={`caption-${post.id}`}>{post.caption}</span> */}
                            <EditPostForm post={post} editCaption={editCaption} toggleEditCaption={() => toggleEditCaption(!editCaption)}/>
                        </div>
                        {sessionUser.id !== post.user.id ? null : (
                            <div className='post-buttons'>
                                <FontAwesomeIcon id ='' icon={faEdit} onClick={() => toggleEditCaption(!editCaption)} />
                                <FontAwesomeIcon icon={faTrash} onClick={() => deletePost()} />

                            </div>
                        )}
                    </div>
                </div>

                <div className='comment-section'>
                    {post?.comments?.allComments?.length > 0 ?
                        <div>
                            {post?.comments?.allComments?.map(comment => {
                                return (
                                    <div key={comment.id}>
                                        <CommentCard post={post} comment={comment} />
                                    </div>
                                )
                            })}
                        </div>
                    :
                        <p>Leave the first comment!</p>
                    }
                </div>
                <hr/>
                <div id='likes-div'>
                    <div id='likes-div-icons'>
                        {!isLiked ? <FontAwesomeIcon icon={faHeart} id='like-button' style={{ "fontSize": "20px" }} onClick={() => toggleLike()} /> : <FontAwesomeIcon icon={faHeartSolid} id='like-button' style={{ "color": "red", "fontSize": "20px" }} onClick={() => toggleLike()} /> }
                        <FontAwesomeIcon icon={faComment} id='comment-icon' style={{ "fontSize": "20px" }}/>
                    </div>
                    <p>{post.likes?.allLikes?.length} {post.likes?.allLikes?.length === 1 ? 'like' : 'likes'}</p>
                </div>
                <hr />
                <div id='create-comment'>

                </div>
            </div>
            

            {/* {post.userId === sessionUser.id &&
                <button
                    type='button'
                    onClick={() => deletePost()}
                >
                    Delete Post
                </button>
            }

            <h2># of Likes: {post.likes.allLikes.length}</h2>
            {isLiked
                ? <button onClick={toggleLike}>unlike</button>
                : <button onClick={toggleLike}>like</button>
            } */}


        </div>
    );
}
