import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import './NavBar.css';

const NavBar = () => {
	const user = useSelector(state => state.session.user);


	return (
		<div id="navbar">
			bruh
		</div>
	);
};

export default NavBar;
