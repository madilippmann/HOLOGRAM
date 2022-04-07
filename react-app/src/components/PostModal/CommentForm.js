import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Picker from 'emoji-picker-react';

import * as postsActions from '../../store/posts'
import './CommentForm.css';

function CommentForm({ postId }) {
	const dispatch = useDispatch();
	const [content, setContent] = useState('');
	const [validationErrors, setValidationErrors] = useState([])
	const [showErrors, setShowErrors] = useState(false);

	useEffect(() => {
		const errors = [];
		if (!content.length) errors.push('please type something before commenting');
		if (content.length > 255) errors.push('comment must be less than 255 characters')

		setValidationErrors(errors);
	}, [content]);

	const onSubmit = (e) => {
		e.preventDefault();
		if (validationErrors.length) return setShowErrors(true);

		const comment = {
			content, postId
		}

		dispatch(postsActions.createComment(comment))
			.then(_ => {
				setContent('');
			})
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setValidationErrors(data.errors);
					setShowErrors(true);
				}
			});
	}

	const onEmojiClick = (event, emojiObject) => {
		console.log(emojiObject.emoji);
		let temp = content + emojiObject.emoji;
		setContent(temp)
		console.log('onEmojiClick ~ temp', temp);
		console.log(content)
	};

	
	return (
		<div id='comment-form-wrapper'>
			<form onSubmit={onSubmit}>
				<input
					id='comment-input'
					name='content'
					value={content}
					maxLength={255}
					onChange={(e) => setContent(e.target.value)}
					placeholder='add a comment'
					autoComplete='off'
				/>
				{/* <Picker onEmojiClick={onEmojiClick} /> */}

				<button type='submit' id='comment-submit'>post</button>
			</form>

			{!showErrors ? null : (
				<ul>
					{validationErrors.map(err => (
						<li key={err}>{err}</li>
					))}
				</ul>
			)}

		</div>
	);
}

export default CommentForm;
