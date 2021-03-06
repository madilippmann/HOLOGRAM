import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import LoadingSpinner from '../LoadingSpinner';

import * as sessionActions from '../../store/session';
import './SettingsPage.css';

import defaultProfileImage from '../../static/default-profile-image.png'

function SettingsPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [newFirstName, setNewFirstName] = useState(sessionUser.firstName);
    const [newLastName, setNewLastName] = useState(sessionUser.lastName);
    const [newBio, setNewBio] = useState(sessionUser.bio || '');
    const [uploadFile, setUploadFile] = useState(null);
    const [validationErrors, setValidationErrors] = useState([]);
    const profileImage = sessionUser.profileImageUrl !== '/default-profile-image.png' ? sessionUser.profileImageUrl : defaultProfileImage
    const [showLoading, setShowLoading] = useState(false);

    // useEffect(() => {
    //     const errors = [];
    //     if (!uploadFile) errors.push('Please choose an image first before uploading.')
    //     setValidationErrors(errors);
    // }, [uploadFile]);

    const s3upload = async (file) => {
        if (!file) return console.log('upload a file first');
        const formData = new FormData()

        formData.append('file', file)

        const res = await axios.post("/api/s3/upload/", formData);

        return res.data
    }

    const updateProfile = async (e) => {
        e.preventDefault();
        setShowLoading(true);
        if (validationErrors.length) return validationErrors(true);


        let user;
        if (uploadFile) {
            user = {
                firstName: newFirstName,
                lastName: newLastName,
                bio: newBio,
                userId: sessionUser.id,
                profileImageUrl: await s3upload(uploadFile)
            }
        }
        else {
            user = {
                firstName: newFirstName,
                lastName: newLastName,
                bio: newBio,
                userId: sessionUser.id,
                profileImageUrl: sessionUser.profileImageUrl
            }
        }


        await dispatch(sessionActions.editUser(user));

        setShowLoading(false);

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        return history.push(`/${sessionUser.handle}`);
    }

    return showLoading ? (
        <div id='updating'>
            <LoadingSpinner />
            {/* <h2>Updating your infomation...</h2> */}
        </div>
    ) : (
        <>
            <form onSubmit={updateProfile} id='settings-form'>
                <div id='left'>
                    <p>Update profile image</p>
                    <div id='upload-and-preview-section' style={{ 'display': 'block' }}>
                        <div id='preview' style={{ 'border': 'none' }}>
                            <img src={uploadFile ? URL.createObjectURL(uploadFile) : profileImage} alt='preview' id='image-preview' />
                        </div>

                        <div id='upload'>
                            <label htmlFor='img' id='select-file-button'>SELECT IMAGE</label>
                            <input type="file" id="img" name="img" accept="image/*"
                                onChange={e => setUploadFile(() => {
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
                </div>

                <div id='update-page-input-fields'>
                    <p>Update information</p>
                    <br />
                    <br />
                    <label htmlFor='new-first-name'>First Name</label>
                    <input type='text' value={newFirstName} id='new-first-name' onChange={e => setNewFirstName(e.target.value)} />
                    <br />
                    <label htmlFor='new-last-name'>Last Name</label>
                    <input type='text' value={newLastName} id='new-last-name' onChange={e => setNewLastName(e.target.value)} />
                    <br />
                    <label htmlFor='new-bio'>Bio</label>
                    <textarea value={newBio} id='new-bio' onChange={e => setNewBio(e.target.value)} />
                    <br />
                    <button type='submit' id='update-button'>Update</button>
                </div>
            </form>
        </>
    )
}

export default SettingsPage;
