import { Link } from 'react-router-dom'
import defaultProfileImage from '../../static/default-profile-image.png'

import './FollowsList.css'

const FollowsList = ({ follows }) => {
    return (
        <>
            {follows.map((follow) => {
                return (
                    <Link to={`/${follow.handle}`} key={follow.id}>
                        <div className='selected-dropdown-user'>
                            <div className='user-profile-avatar'>
                                <img className='follows-avatar-image' src={follow.profileImageUrl !== '/default-profile-image.png' ? follow.profileImageUrl : defaultProfileImage} alt='preview' />
                            </div>
                            <div className='justify-left'>
                                <p className='follows-name'>{follow.firstName} {follow.lastName}</p>
                                <p className='follows-handle'>{follow.handle}</p>
                            </div>
                        </div>
                    </Link>
                )
            })}

        </>
    );
}

export default FollowsList;
