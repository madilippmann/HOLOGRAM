import React from 'react'

import './ProfileIcon.css'

export default function ProfileIcon({ user }) {
    return (
        <div className='profile-icon-border'>
            <img
                className='profile-icon'
                src={user.profileImageUrl ? user.profileImageUrl : "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"}
                alt="profile-picture"
            />
        </div>
    )
}
