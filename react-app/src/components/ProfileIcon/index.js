import React from 'react'

import defaultProfileImage from '../../static/default-profile-image.png'

import './ProfileIcon.css'

export default function ProfileIcon({ user }) {
    return (
        <div className='profile-icon-border'>
            <img
                className='profile-icon'
				src={user.profileImageUrl !== '/default-profile-image.png' ? user.profileImageUrl : defaultProfileImage}
                alt="profile-picture"
            />
        </div>
    )
}
