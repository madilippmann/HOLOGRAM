import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import * as postsActions from '../../store/posts'
import './CreatePostPage.css'

export default function CreatePostPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [caption, setCaption] = useState('');
	const [validationErrors, setValidationErrors] = useState([])
	const [showErrors, setShowErrors] = useState(false);
	const [uploadFile, setUploadFile] = useState()

	useEffect(() => {
		const errors = [];
		if (caption.length > 255) errors.push('Caption must be less than 255 characters')
		setValidationErrors(errors);
	}, [caption])


	const onSubmit = async (e) => {
		e.preventDefault();
		if (validationErrors.length) return setShowErrors(true);

		const url = await s3upload(uploadFile)

		const post = {
			caption,
			postImageUrl: url
		}

		dispatch(postsActions.createPost(post))
			.then(async post => {
				window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
				return history.push(`/`);
			})
			.catch(async (res) => {
				console.log(res);
				const data = await res.json();
				if (data && data.errors) {
					setValidationErrors(data.errors);
					setShowErrors(true);
				}
			});
	}

	const s3upload = async (file) => {
		if (!file) return console.log('upload a file first');
		const formData = new FormData()

		formData.append('file', file)

		const res = await axios.post("/api/s3/upload/", formData);

		return res.data
	}


	return (
		<div id='post-upload'>
			<form onSubmit={onSubmit} id='post-form'>
				<div id='upload-and-preview-section'>
					<div id='preview'>
						{uploadFile &&
							<img src={URL.createObjectURL(uploadFile)} alt='image preview' id='image-preview' />
						}
					</div>

					<div id='upload'>
						<label htmlFor='img' id='upload-button'>SELECT IMAGE</label>
						<input type="file" id="img" name="img" accept="image/*"
							onChange={e => setUploadFile(() => e.target.files[0])}
							hidden
						/>
					</div>

				</div>


				{/* <label htmlFor='caption'>Caption</label> */}
				<input
					type='text'
					id='caption'
					name='caption'
					value={caption}
					onChange={(e) => setCaption(e.target.value)}
					placeholder='enter a caption...'
				/>

				<button type='submit'>UPLOAD</button>
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
