import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import Picker from 'emoji-picker-react';

import * as postsActions from '../../store/posts'
import './CommentForm.css';

function CommentForm({ postId }) {
	const dispatch = useDispatch();
	const [content, setContent] = useState('');
	const [showCharCount, setShowCharCount] = useState(false)
	const [validationErrors, setValidationErrors] = useState([])

	useEffect(() => {
		const errors = [];
		if (!content.length) errors.push('!content');
		if (content.length > 255) errors.push('content>255');

		setValidationErrors(errors);
	}, [content]);

	const onSubmit = (e) => {
		e.preventDefault();
		if (validationErrors.length) return;

		const comment = {
			content, postId
		}

		dispatch(postsActions.createComment(comment))
			.then(_ => {
				setContent('');
				const commentsList = document.querySelector(".comment-section");
				commentsList.scrollTop = 0;
			})
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setValidationErrors(data.errors);
				}
			});
	}
	

	return (
		<div id='comment-form-wrapper'>
			<form onSubmit={onSubmit} onFocus={() => setShowCharCount(true)} onBlur={() => setShowCharCount(false)}>
				<input
					id='comment-input'
					name='content'
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder='add a comment'
					autoComplete='off'
				/>

				<button type='submit'
					id='comment-submit'
					style={{ cursor: validationErrors.length ? 'not-allowed' : 'pointer' }}
				>post</button>

				{showCharCount &&
					<small style={content.length > 255 || content.length === 0 ? { color: 'red' } : {}}
					>{content.length}/255</small>
				}
			</form>
		</div>
	);
}

export default CommentForm;
