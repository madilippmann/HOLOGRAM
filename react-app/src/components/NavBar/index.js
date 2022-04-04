import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar";

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
					<div>
						[user actions go here]
					</div>
					<div>
						[user stats go here]
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
