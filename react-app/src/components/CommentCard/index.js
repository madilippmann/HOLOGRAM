import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import * as postsActions from '../../store/posts'
import ProfileIcon from '../ProfileIcon/index';
import './CommentCard.css'
import EditCommentForm from './EditCommentForm';

export default function CommentCard({ post, comment }) {
	const dispatch = useDispatch();
	let sessionUser = useSelector(state => state.session.user);
	const [showEdit, setShowEdit] = useState(false);
	const [showButtons, setShowButtons] = useState(false);
	const [tick, setTick] = useState(+(comment.timeElapsed.split(' ')[0]) + 1);

	useEffect(() => {
	  let timer;
	  
	  if (tick === 59) {
		timer = setTimeout(() => {
		  comment.timeElapsed = '1 minute ago';
		  setTick(60);
		}, 1000);
		return;
	  }
	  
	  if (comment.timeElapsed.endsWith('seconds ago') || comment.timeElapsed.endsWith('second ago')) {
		timer = setTimeout(() => setTick(prev => prev + 1), 1000);
		comment.timeElapsed = `${tick + 1} seconds ago`;
	  }
	  
	  return () => clearTimeout(timer);
	}, [comment, tick]);

	const deleteComment = (commentId) => {
		if (window.confirm('Are you sure you would like to delete your comment?')) {
			dispatch(postsActions.deleteComment(commentId, post.id))
		}
	}


	return (
		<div className='comment-container' onMouseEnter={() => setShowButtons(true)} onMouseLeave={() => setShowButtons(false)}>
			<div style={{ width: '30px', height: '30px', minWidth: '30px', minHeight: '30px' }}>
				<ProfileIcon user={comment.user} />
			</div>

			<div className='comment-body'>
				{showEdit ? (
					<EditCommentForm comment={comment} setShowEdit={setShowEdit} />
				) : (
					<div className='handle-and-comment-content'>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span className='comment-user-handle'>{comment.user.handle}</span>
							<span style={{ color: 'var(--color-gray)' }}>{comment.timeElapsed}</span>
						</div>
						<span className='comment-text'>{comment.content}</span>
					</div>
				)}
			</div>

			{comment.user.id === sessionUser.id && showButtons &&
				<div className='edit-and-delete-buttons'>
					<FontAwesomeIcon icon={faEdit} id='edit-comment-button' onClick={() => setShowEdit(!showEdit)} />
					<FontAwesomeIcon icon={faTrash} id='delete-comment-button' onClick={() => deleteComment(comment.id)} />
				</div>
			}
		</div>
	)
}
