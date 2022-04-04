import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
	const user = useSelector(state => state.session.user);


	return (
		<div id='footer'>
			bruh
		</div>
	);
}
