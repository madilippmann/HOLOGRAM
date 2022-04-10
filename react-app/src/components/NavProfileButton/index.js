import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import { logout } from '../../store/session';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './NavProfileButton.css'

import defaultProfileImage from '../../static/default-profile-image.png'

export default function NavProfileButton({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		document.querySelector('.nav-profile-button')
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			document.querySelector('.nav-profile-button')
			setShowMenu(false);
		};

		document.addEventListener('click', closeMenu);

		return () => {
			setShowMenu(false);
			document.removeEventListener("click", closeMenu);
		}
	}, [showMenu]);

	const logoutUser = (e) => {
		setShowMenu(false);
		if (window.confirm('Are you sure you want to log out?')) {
			dispatch(logout());
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			history.push('/login');
		}
	};

	return (
		<div className="nav-profile-button" onClick={openMenu}>
			<img
				src={user.profileImageUrl !== '/default-profile-image.png' ? user.profileImageUrl : defaultProfileImage}
				alt="profile preview"

			/>

			{showMenu && (
				<div className="profile_nav_dropdown">
					<div>
						<button
						//  to={`/${user.handle}`}
						 	id='temp'
							onClick={() => {
								window.scrollTo(0, 0);
								history.push(`/${user.handle}`);
								window.location.reload(false);
							}}
							style={{border: 'none', backgroundColor: 'transparent', padding: '2px'}}>
							<p style={{letterSpacing: '1px', fontSize: '14.5px'}}>profile&nbsp;&nbsp;<FontAwesomeIcon icon={faUser}></FontAwesomeIcon></p>

						</button>
					</div>
					<div>
						<NavLink to={`/users/settings`} onClick={() => window.scrollTo(0, 0)} style={{width: '100%'}}>
							settings&nbsp;&nbsp;
							<FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
						</NavLink>
					</div>
					<div onClick={logoutUser}>
						log out&nbsp;&nbsp;
						<FontAwesomeIcon icon={faArrowRightFromBracket}></FontAwesomeIcon>
					</div>
				</div>
			)}
		</div>
	);
}
