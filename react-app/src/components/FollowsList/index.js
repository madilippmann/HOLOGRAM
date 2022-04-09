import { Link, useHistory } from 'react-router-dom'
import defaultProfileImage from '../../static/default-profile-image.png'

import './FollowsList.css'

const FollowsList = ({ follows }) => {
    const history = useHistory();
    return (
        <>
            {follows.map((follow) => {
                return (
                    <button
                    // to={`/${follow.handle}`}
                        onClick={() => {
                            window.scroll(0, 0);
                            history.push(`/${follow.handle}`);
                            // window.location.reload(false);
                        }}
                        style={{border: 'none', backgroundColor:'white'}}
                        key={follow.id}
                    >
                        <div className='selected-dropdown-user'>
                            <div className='user-profile-avatar'>
                                <img className='follows-avatar-image' src={follow.profileImageUrl !== '/default-profile-image.png' ? follow.profileImageUrl : defaultProfileImage} alt='preview' />
                            </div>
                            <div className='justify-left'>
                                <p className='follows-name'>{follow.firstName} {follow.lastName}</p>
                                <p className='follows-handle'>{follow.handle}</p>
                            </div>
                        </div>
                    </button>
                )
            })}

        </>
    );
}

export default FollowsList;
