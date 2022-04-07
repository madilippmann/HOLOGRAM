import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import defaultProfileImage from '../../static/default-profile-image.png'

import * as sessionActions from '../../store/session';
import './SettingsPage.css';

//TODO profileImage, first name, last name, bio

function SettingsPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const [newFirstName, setNewFirstName] = useState(user.firstName);
    const [newLastName, setNewLastName] = useState(user.lastName);
    const [newBio, setNewBio] = useState(user.bio || '');
    // const [newProfileImageUrl, setNewProfileImageUrl] = useState(user.profileImageUrl);

    const updateProfile = async (e) => {
        e.preventDefault();
        const user = {
            firstName: newFirstName,
            lastName: newLastName,
            bio: newBio,
            userId: user.id
            // newProfileImageUrl: newProfileImageUrl
        }

        await dispatch(sessionActions.editUser(user));
        return history.push(`/${user.handle}`);
    }

    return (
        <>
            <form onSubmit={updateProfile} id='settings-form'>
                <div className='profile-picture-container-settings-page'>
                    <img className='profile-picture-settings-page' src={user.profileImageUrl !== '/default-profile-image.png' ? user.profileImageUrl : defaultProfileImage} alt={`${user.firstName}'s profile`} />
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
                <input type='text' value={newBio} id='new-bio' onChange={e => setNewBio(e.target.value)} />
                <br/>
                <button type='submit'>Update</button>
            </form>
        </>
    )
}

export default SettingsPage;
