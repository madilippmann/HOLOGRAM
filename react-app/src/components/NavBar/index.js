import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCirclePlus, faMessage } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

const NavBar = () => {
	const user = useSelector(state => state.session.user);


	return (
		<div id="navbar">
			<div className="navbar-container">
				<div className="nav__left">
					<div className="logo-wrapper">
						<img src="/hologramLogo.png"
							alt="logo"
							className="nav__logo"
						/>
						<img src="/hologramLogoText.png"
							alt="logo-text"
							className="nav__logo-text"
							style={{ width: '200px' }}
						/>
					</div>

					<div className="search-bar">
						<SearchBar />
					</div>
				</div>



				<div className="nav__right">
					<div className="nav__buttons">
						<div><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></div>
						<div><FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon></div>
						<div><FontAwesomeIcon icon={faMessage}></FontAwesomeIcon></div>
					</div>
					<div className="nav__stats">
						<div>
							<span>50</span>
							<small>posts</small>
						</div>
						<div>
							<span>2.5k</span>
							<small>followers</small>
						</div>
						<div>
							<span>2.3k</span>
							<small>following</small>
						</div>
					</div>
					<div>
						[user profile button goes here]
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
