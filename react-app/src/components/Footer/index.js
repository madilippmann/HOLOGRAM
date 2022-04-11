import { useState } from 'react';

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
							<a href='https://github.com/madilippmann'>
								<img
									className='link-logo'
									src='https://i.pinimg.com/originals/48/e0/73/48e07378e01dd719c060c1f2f2b5cb00.png'
									alt='github logo' />
							</a>
						</li>
 						<li>Nick Esqueda</li>
 						<li>Kevin Pravia Mayorga</li>
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
