import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import FeedPage from './components/FeedPage';
import { authenticate } from './store/session';
import ProfilePage from './components/ProfilePage/index.js';
import Post from './components/Post';
import CreatePostPage from './components/CreatePostPage';
import EditPostForm from './components/EditPostForm';
import CommentForm from './components/CommentForm';
import EditCommentForm from './components/EditCommentForm';
import HeaderFooterWrapper from './components/HeaderFooterWrapper';
import PageNotFound from './components/PageNotFound';
import SearchPage from './components/SearchPage';

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
						<LoginForm />
					</Route>
					<Route path='/sign-up' exact={true}>
						<SignUpForm />
					</Route>
					<ProtectedRoute path='/users' exact={true} >
						<UsersList />
					</ProtectedRoute>
					<ProtectedRoute path='/' exact={true} >
						<FeedPage />
					</ProtectedRoute>
					<ProtectedRoute path='/users/:userId(\d+)' exact={true} >
						{/* <User /> */}
						<ProfilePage />
					</ProtectedRoute>
					{/* <ProtectedRoute path='/' exact={true} >
						<h1>My Home Page</h1>
					</ProtectedRoute> */}

					{/* FOR TESTING THE POST FORM PAGE */}
					<ProtectedRoute exact path="/posts/new">
						<CreatePostPage />
					</ProtectedRoute>

					{/* FIX FIX FIX */}
					<ProtectedRoute exact path="/posts/:postId(\d+)/edit">
						<EditPostForm />
					</ProtectedRoute>

					{/* FOR TESTING THE POST PAGE (WILL BE MODAL LATER) */}
					<ProtectedRoute exact path="/posts/:postId(\d+)">
						<Post />
					</ProtectedRoute>

					{/* FOR TESTING COMMENT POST */}
					<ProtectedRoute exact path="/posts/:postId(\d+)/comments/new">
						<CommentForm />
					</ProtectedRoute>

					<ProtectedRoute exact path="/posts/:postId(\d+)/comments/:commentId(\d+)/edit">
						<EditCommentForm />
					</ProtectedRoute>
					
					<ProtectedRoute exact path="/search/:query">
						<SearchPage />
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
