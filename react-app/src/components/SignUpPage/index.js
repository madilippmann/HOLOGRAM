import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

import './SignUpPage.css'
import logo from '../../static/hologram-logo.png'



export default function SignUpPage() {
	const [errors, setErrors] = useState([]);
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [handle, setHandle] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const user = useSelector(state => state.session.user);
	const dispatch = useDispatch();

	useEffect(() => {
		document.body.style.background = "linear-gradient(135deg, rgba(122,123,255,1) 12%, rgba(255,201,181,1) 91%)";
		document.body.style.minHeight = "100vh"
		document.body.style.margin = "auto"
		document.body.style.display = "flex"
		document.body.style.justifyContent = "center"
		document.body.style.alignItems = "center"
		document.body.style.width = "100vw"
		return () => {
			document.body.style.backgroundColor = "rgb(252, 248, 247)";
			document.body.style.background = "rgb(252, 248, 247)";
			document.body.style.minHeight = "1200px"

		};
	}, []);


	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			const data = await dispatch(signUp(firstName, lastName, handle, email, password));
			if (data) {
				setErrors(data)
			}
		}
	};

	const updateFirstName = (e) => {
		setFirstName(e.target.value);
	};

	const updateLastName = (e) => {
		setLastName(e.target.value);
	};

	const updateHandle = (e) => {
		setHandle(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to='/' />;
	}


	return (
		<div className='signup-login-container'>

			<div className='signup-login-form-container'>
				<form
					className='signup-login-form'
					onSubmit={onSignUp}
				>
					<div className='logo-title-container'>
						<img id='signup-login-logo' src={logo} alt='HOLOGRAM logo' />
						<h1><span style={{ color: 'var(--color-purple)' }}>holo</span><span style={{ color: 'rgb(215, 155, 134)' }}>gram</span></h1>

					</div>
					<div>
						{errors.map((error, ind) => (
							<div key={ind}>{error}</div>
						))}
					</div>

					<div className='signup-login-input-container'>
						<input
							type='text'
							name='firstName'
							onChange={updateFirstName}
							value={firstName}
							className='signup-login-input'
							placeholder='first name'
						></input>
					</div>

					<div className='signup-login-input-container'>
						<input
							type='text'
							name='handle'
							onChange={updateLastName}
							value={lastName}
							className='signup-login-input'
							placeholder='last name'
							autoComplete='new-password'
						></input>
					</div>

					<div className='signup-login-input-container'>
						<input
							type='text'
							name='handle'
							onChange={updateHandle}
							value={handle}
							className='signup-login-input'
							placeholder='handle'
							autoComplete='new-password'
						></input>
					</div>

					<div className='signup-login-input-container'>
						<input
							type='text'
							name='email'
							onChange={updateEmail}
							value={email}
							className='signup-login-input'
							placeholder='email'
							autoComplete='new-password'
						></input>
					</div>

					<div className='signup-login-input-container'>
						<input
							type='password'
							name='password'
							onChange={updatePassword}
							value={password}
							className='signup-login-input'
							placeholder='password'
						></input>
					</div>

					<div className='signup-login-input-container'>
						<input
							type='password'
							name='repeat_password'
							onChange={updateRepeatPassword}
							value={repeatPassword}
							required={true}
							className='signup-login-input'
							placeholder='confirm password'
						></input>
					</div>
					<button className='signup-login-submit-button' type='submit'>sign up</button>
					<div className='border-top'>
						<Link to='/login'>
							<p className='login-link'>
								login
							</p>
						</Link>

					</div>
				</form>

			</div>

		</div>
	);
};
