import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import CreatePostPage from './components/CreatePostPage';
import FeedPage from './components/FeedPage';
import HeaderFooterWrapper from './components/HeaderFooterWrapper';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PageNotFound from './components/PageNotFound';
import ProfilePage from './components/ProfilePage/index.js';
import SignUpPage from './components/SignUpPage';
import SearchPage from './components/SearchPage';
import SettingsPage from './components/SettingsPage';

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<HeaderFooterWrapper>
				<Switch>
					<Route path='/login' exact={true}>
						<LoginPage />
					</Route>

					<Route path='/sign-up' exact={true}>
						<SignUpPage />
					</Route>

					<ProtectedRoute path='/' exact={true} >
						<FeedPage />
					</ProtectedRoute>

					<ProtectedRoute exact path="/posts/new">
						<CreatePostPage />
					</ProtectedRoute>

					<ProtectedRoute exact path="/search/:query">
						<SearchPage />
					</ProtectedRoute>

					<ProtectedRoute path='/:handle' exact={true} >
						<ProfilePage />
					</ProtectedRoute>

					<ProtectedRoute path='/users/settings' exact={true} >
						<SettingsPage />
					</ProtectedRoute>

					<Route>
						<PageNotFound />
					</Route>
				</Switch>
			</HeaderFooterWrapper>
		</BrowserRouter>
	);
}

export default App;
