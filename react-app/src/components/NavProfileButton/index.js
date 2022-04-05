import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import { logout } from '../../store/session';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './NavProfileButton.css'

export default function NavProfileButton({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		document.querySelector('.nav-profile-button')
			.style.backgroundColor = '#111213';
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			document.querySelector('.nav-profile-button')
				.style.backgroundColor = '#212121'
			setShowMenu(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const logoutUser = (e) => {
		if (window.confirm('Are you sure you want to log out?')) {
			dispatch(logout());
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			history.push('/login');
		}
	};

	return (
		<div className="nav-profile-button" onClick={openMenu}>
			<img
				src={user.profileImageUrl}
				alt="profile-picture"
			/>

			{showMenu && (
				<div className="profile_nav_dropdown">
					<div>
						<NavLink to={`/users/${user.id}`} onClick={() => window.scrollTo(0, 0)}>
							profile&nbsp;&nbsp;
							<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
						</NavLink>
					</div>
					<div>
						<NavLink to={`/users/${user.id}`} onClick={() => window.scrollTo(0, 310)}>
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
