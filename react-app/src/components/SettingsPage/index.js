import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import defaultProfileImage from '../../static/default-profile-image.png'

import * as sessionActions from '../../store/session';
import './SettingsPage.css';
import ProfileIcon from '../ProfileIcon';

//TODO profileImage, first name, last name, bio

function SettingsPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [newFirstName, setNewFirstName] = useState(sessionUser.firstName);
    const [newLastName, setNewLastName] = useState(sessionUser.lastName);
    const [newBio, setNewBio] = useState(sessionUser.bio || '');
    const [uploadFile, setUploadFile] = useState();
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
		const errors = [];
		if (!uploadFile) errors.push('Please choose an image first before uploading.')
		setValidationErrors(errors);
	}, [uploadFile]);

    const s3upload = async (file) => {
		if (!file) return console.log('upload a file first');
		const formData = new FormData()

		formData.append('file', file)

		const res = await axios.post("/api/s3/upload/", formData);

		return res.data
	}

    const updateProfile = async (e) => {
        e.preventDefault();

        if (validationErrors.length) return validationErrors(true);
        const url = await s3upload(uploadFile)
        const user = {
            firstName: newFirstName,
            lastName: newLastName,
            bio: newBio,
            userId: sessionUser.id,
            profileImageUrl: url
        }

        console.log(user);

        await dispatch(sessionActions.editUser(user));
        return history.push(`/${sessionUser.handle}`);
    }

    return (
        <>
            <form onSubmit={updateProfile} id='settings-form'>
                <div className='profile-picture-container-settings-page'>
                    <ProfileIcon user={sessionUser} />
                </div>

                <div id='upload-and-preview-section'>
					<div
						id='preview'
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

                <div className='error-container'>
					{validationErrors.map(err => (
						<div key={err}>{err}</div>
					))}
				</div>

                <label htmlFor='new-first-name'>First Name</label>
                <br/>
                <input type='text' value={newFirstName} id='new-first-name' onChange={e => setNewFirstName(e.target.value)} />
                <br/>
                <label htmlFor='new-last-name'>Last Name</label>
                <br/>
                <input type='text' value={newLastName} id='new-last-name' onChange={e => setNewLastName(e.target.value)} />
                <br/>
                <label htmlFor='new-bio'>Bio</label>
                <br/>
                <textarea value={newBio} id='new-bio' onChange={e => setNewBio(e.target.value)} />
                <br/>
                <button type='submit'>Update</button>
            </form>
        </>
    )
}

export default SettingsPage;
