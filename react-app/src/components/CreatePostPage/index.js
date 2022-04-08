import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import LoadingBar, { showLoading, hideLoading } from 'react-redux-loading-bar';


import * as postsActions from '../../store/posts'
import './CreatePostPage.css'

export default function CreatePostPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [caption, setCaption] = useState('');
	const [uploadFile, setUploadFile] = useState();
	const [showErrors, setShowErrors] = useState(false);
	const [validationErrors, setValidationErrors] = useState([]);

	useEffect(() => {
		const errors = [];
		if (caption.length > 255) errors.push('Caption must be less than 255 characters');
		if (!uploadFile) errors.push('Please choose an image first before uploading.')
		setValidationErrors(errors);
	}, [caption, uploadFile]);


	const onSubmit = async (e) => {
		e.preventDefault();
		if (validationErrors.length) return setShowErrors(true);

		dispatch(showLoading());
		const url = await s3upload(uploadFile)

		const post = {
			caption,
			postImageUrl: url
		}

		dispatch(postsActions.createPost(post))
			.then(async post => {
				dispatch(hideLoading());
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

	const cancelUpload = (e) => {
		if (window.confirm('Are you sure you want to cancel your upload?')) {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			history.push('/');
		}
	}


	return (
		<div id='post-upload'>
			<form onSubmit={onSubmit} id='post-form'>
				<LoadingBar style={{ backgroundColor: 'var(--color-apricot)', height: '12px', maxWidth: '500px', position: 'absolute', top: '0', left: '0', right: '0', margin: '0 auto' }} updateTime={100} progressIncrease={5} maxProgress={95} />
				<div id='upload-and-preview-section'>
					<div
						id='preview'
						style={validationErrors.includes('Please choose an image first before uploading.') && showErrors ? { border: '1.4px solid red' } : {}}
					>
						{uploadFile &&
							<img src={URL.createObjectURL(uploadFile)} alt='image preview' id='image-preview' />
						}
					</div>

					<div id='upload'>
						<label htmlFor='img' id='select-file-button'>SELECT IMAGE</label>
						<input type="file" id="img" name="img" accept="image/*"
							onChange={e => setUploadFile(() => {
								console.log(e.target.files[0]);
								return e.target.files[0];
							})}
							hidden
						/>
					</div>
				</div>


				<div className='upload__bottom'>
					<textarea
						type='text'
						id='caption'
						className={validationErrors.includes('Caption must be less than 255 characters') ? 'red-outline' : ''}
						rows={4}
						placeholder='enter a caption...'
						name='caption'
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
					></textarea>
					<small className='character-count'
						style={caption.length > 255 ? { color: 'red' } : {}}
					>{caption.length}/255</small>
					<div className='upload-button-container'>
						<button type='submit' id='upload-button'>UPLOAD</button>
						<button type='button'
							id='cancel-button'
							onClick={cancelUpload}
						>CANCEL</button>
					</div>
				</div>
			</form>

			{!showErrors ? null : (
				<div className='error-container'>
					{validationErrors.map(err => (
						<div key={err}>{err}</div>
					))}
				</div>
			)}
		</div>

	);
}
