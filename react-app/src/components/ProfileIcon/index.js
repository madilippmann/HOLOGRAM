import React from 'react'
import { useHistory } from 'react-router-dom'

import defaultProfileImage from '../../static/default-profile-image.png'

import './ProfileIcon.css'

export default function ProfileIcon({ user }) {
    const history = useHistory();

    return (
        <div
            className='profile-icon-border'
            onClick={(e) => history.push(`/${user.handle}`)}
        >
            <img
                className='profile-icon'
				src={user.profileImageUrl !== '/default-profile-image.png' ? user.profileImageUrl : defaultProfileImage}
                alt="profile"
            />
        </div>
    )
}
