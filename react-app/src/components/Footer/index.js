import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
	const user = useSelector(state => state.session.user);


	return (
		<>
			<div id='footer-background' className='hidden'>
			</div>
			<footer id='footer'>
				<div id='information-button'>
					{/* open information modal */}
					<button type='button'>i</button>
				</div>
				<div id='languages'>
					<ul>
						<li>React</li>
						<li>Redux</li>
						<li>Python</li>
						<li>Flask</li>
						<li>PostgreSQL</li>
						<li>SQLAlchemy</li>
						<li>Heroku</li>
						<li>AWS</li>
						<li>HTML</li>
						<li>CSS</li>
					</ul>
				</div>
			</footer>
		</>
	);
}
