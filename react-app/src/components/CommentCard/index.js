import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as postsActions from '../../store/posts'

export default function CommentCard({ post, comment }) {
	const dispatch = useDispatch();
	let sessionUser = useSelector(state => state.session.user);
	
    const deleteComment = (commentId) => {
        dispatch(postsActions.deleteComment(commentId, post.id))
    }
	
	return (
		<div>
			{comment.user.handle} - {comment.content}
			{comment.user.id === sessionUser.id &&
				<>
					<Link to={`/posts/${post.id}/comments/${comment.id}/edit`}>Edit</Link>
					<button
						type='button'
						onClick={() => deleteComment(comment.id)}
					>
						Delete
					</button>
				</>
			}
		</div>

	)
}
