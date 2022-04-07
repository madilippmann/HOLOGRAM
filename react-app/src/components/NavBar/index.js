import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCirclePlus, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import NavProfileButton from "../NavProfileButton";

import logo from '../../static/hologram-logo.png'

const NavBar = () => {
	const sessionUser = useSelector(state => state.session.user);
	const [showFollowers, setShowFollowers] = useState(false)
	const [showFollowings, setShowFollowings] = useState(false)

	const openFollows = (type) => {
		if (type === 'following') {
			if (showFollowings) return;
			document.querySelector('.sessionUser-following')
			setShowFollowings(true);
		} else if (type === 'followers') {
			if (showFollowers) return;
			document.querySelector('.sessionUser-followers')
			setShowFollowers(true);
		}
	}


	useEffect(() => {
		if (showFollowings) setShowFollowings(() => false)
		if (!showFollowers) return;

		const closeFollowers = () => {
			document.querySelector('.sessionUser-followers')
			setShowFollowers(false);
		};

		document.addEventListener('click', closeFollowers);

		return () => {
			setShowFollowers(false);
			document.removeEventListener("click", closeFollowers);
		}

	}, [showFollowers]);

	useEffect(() => {
		if (showFollowers) setShowFollowers(() => false)
		if (!showFollowings) return;

		const closeFollowings = () => {
			document.querySelector('.sessionUser-followings')
			setShowFollowings(false);
		};

		document.addEventListener('click', closeFollowings);

		return () => {
			setShowFollowings(false);
			document.removeEventListener("click", closeFollowings);
		}

	}, [setShowFollowings]);



	return !sessionUser ? null : (
		<div id="navbar">
			<div className="navbar-container">
				<div className="nav__left">
					<Link to='/'>
						<div className="logo-wrapper">
							<img src={logo}
								alt="logo"
								className="nav__logo"
							/>
							<h1><span style={{ color: 'var(--color-purple)' }}>holo</span><span style={{ color: 'rgb(215, 155, 134)' }}>gram</span></h1>
						</div>
					</Link>

				</div>


				<div className="search-bar">
					<SearchBar />
				</div>


				<div className="nav__right">
					<div className="nav__buttons">
						<Link to='/'>
							<FontAwesomeIcon icon={faHouse} className='nav__icon' />
						</Link>
						<Link to='/posts/new'>
							<FontAwesomeIcon icon={faCirclePlus} className='nav__icon' />
						</Link>
						{/* TODO Change route to /messages */}
						<Link to={`/`}>
							<FontAwesomeIcon icon={faEnvelope} className='nav__icon' />
						</Link>
					</div>

					<div className="nav__stats">
						<div>
							<button
								type='button'
								onClick={() => openFollows('followers')}
							>
								<span>{sessionUser?.followers.length}</span>
								<small>followers</small>
							</button>

							{showFollowers && (
								<div className="profile_nav_dropdown">
									<div>
										profile&nbsp;&nbsp;
									</div>
									<div>
										settings&nbsp;&nbsp;
									</div>
								</div>
							)}
						</div>
						<div>
							<button
								type='button'
								onClick={() => openFollows('following')}
							>
								<span>{sessionUser?.following.length}</span>
								<small>following</small>
							</button>
							{showFollowings && (
								<div className="profile_nav_dropdown">
									<div>
										profile&nbsp;&nbsp;

									</div>
									<div>
										settings&nbsp;&nbsp;
									</div>
								</div>
							)}
						</div>
					</div>

					<NavProfileButton user={sessionUser} />
				</div>
			</div>
		</div>
	);
};

export default NavBar;
