import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCirclePlus, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import NavProfileButton from "../NavProfileButton";


const NavBar = () => {
	const user = useSelector(state => state.session.user);


	return !user ? null : (
		<div id="navbar">
			<div className="navbar-container">
				<div className="nav__left">
					<Link to='/'>
						<div className="logo-wrapper">
							<img src='/hologramLogo.png'
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
							<span>2.5k</span>
							<small>followers</small>
						</div>
						<div>
							<span>2.3k</span>
							<small>following</small>
						</div>
					</div>

					<NavProfileButton user={user} />
				</div>
			</div>
		</div>
	);
};

export default NavBar;
