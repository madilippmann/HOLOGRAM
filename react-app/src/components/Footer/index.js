import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

export default function Footer() {

	const [showInfo, setShowInfo] = useState(true);

	return showInfo ? (
		<>
			<div id='footer-background' className='hidden'>
			</div>
			<footer id='footer'>
				<div id='information-button'>
					<button id='change' type='button' onClick={() => setShowInfo(!showInfo)}>i</button>
				</div>
				<div id='languages'>
					<ul>
						<li>
							Madi Lippmann
							<a href='https://github.com/madilippmann' target="_blank" rel="noreferrer">
								<FontAwesomeIcon icon={faGithub} className='link-logo' />
							</a>
							<a href='https://www.linkedin.com/in/madilippmann/' target="_blank" rel="noreferrer">
								<FontAwesomeIcon icon={faLinkedin} className='link-logo' />
							</a>
						</li>
						<li>
							Nick Esqueda
							<a href='https://github.com/nick-esqueda' target="_blank" rel="noreferrer">
								<FontAwesomeIcon icon={faGithub} className='link-logo' />
							</a>
							<a href='https://www.linkedin.com/in/nick-esqueda/' target="_blank" rel="noreferrer">
								<FontAwesomeIcon icon={faLinkedin} className='link-logo' />
							</a>
						</li>
						<li>
							Kevin Pravia Mayorga
							<a href='https://github.com/reversalbino' target="_blank" rel="noreferrer">
								<FontAwesomeIcon icon={faGithub} className='link-logo' />
							</a>
							<a href='https://www.linkedin.com/in/kevin-pravia-mayorga-51380817a' target="_blank" rel="noreferrer">
								<FontAwesomeIcon icon={faLinkedin} className='link-logo' />
							</a>
						</li>
					</ul>
				</div>
			</footer>
		</>
	)
		:
		(
			<>
				<div id='footer-background' className='hidden'>
				</div>
				<footer id='footer'>
					<div id='information-button'>
						<button id='change' type='button' onClick={() => setShowInfo(!showInfo)}>i</button>
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
		)
}

// export default function Footer() {
// 	return (
// 		<>
// 			<div id='footer-background' className='hidden'>
// 			</div>
// 			<footer id='footer'>
// 				<div id='information-button'>
// 					{/* open information modal */}
// 					<button type='button'>i</button>
// 				</div>
// 				<div id='languages'>
// 					<ul>
// 						<li>React</li>
// 						<li>Redux</li>
// 						<li>Python</li>
// 						<li>Flask</li>
// 						<li>PostgreSQL</li>
// 						<li>SQLAlchemy</li>
// 						<li>Heroku</li>
// 						<li>AWS</li>
// 						<li>HTML</li>
// 						<li>CSS</li>
// 					</ul>
// 				</div>
// 			</footer>
// 		</>
// 	);
// }
