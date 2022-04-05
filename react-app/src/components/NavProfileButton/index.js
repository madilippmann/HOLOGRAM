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
				src={user.profileImageUrl ? user.profileImageUrl : "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGdyYWRpZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"}
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
