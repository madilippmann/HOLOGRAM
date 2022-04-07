import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import * as postsActions from '../../store/posts'
import './CommentCard.css'

export default function CommentCard({ post, comment }) {
	const dispatch = useDispatch();
	let sessionUser = useSelector(state => state.session.user);

	const deleteComment = (commentId) => {
		dispatch(postsActions.deleteComment(commentId, post.id))
	}

	return (
		<div className='comment-container'>
			<img className='comment-profile-image' alt={comment.user.handle} src={comment.user.profileImageUrl} />
			
			<div className='comment-body'>
				<div className='handle-and-comment-content'>
					<span className='comment-user-handle'>{comment.user.handle}</span>
					<span className='comment-text'>{comment.content}</span>
				</div>

			</div>
			
			{comment.user.id === sessionUser.id &&
				<div className='edit-and-delete-buttons'>
					<FontAwesomeIcon icon={faEdit} id='edit-comment-button' onClick={() => deleteComment(comment.id)} />
					<FontAwesomeIcon icon={faTrash} id='delete-comment-button' onClick={() => deleteComment(comment.id)} />
				</div>
			}
		</div>
	)
}





{/* <Link to={`/posts/${post.id}/comments/${comment.id}/edit`}>HRERERERERE</Link> */ }
