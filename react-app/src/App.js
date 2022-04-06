import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import CommentForm from './components/PostModal/CommentForm';
import CreatePostPage from './components/CreatePostPage';
import EditPostForm from './components/PostModal/EditPostForm';
import EditCommentForm from './components/PostModal/EditCommentForm';
import FeedPage from './components/FeedPage';
import HeaderFooterWrapper from './components/HeaderFooterWrapper';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PageNotFound from './components/PageNotFound';
import ProfilePage from './components/ProfilePage/index.js';
import SignUpPage from './components/SignUpPage';
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
						<LoginPage />
					</Route>

					<Route path='/sign-up' exact={true}>
						<SignUpPage />
					</Route>

					<ProtectedRoute path='/' exact={true} >
						<FeedPage />
					</ProtectedRoute>

					{/* FOR TESTING THE POST FORM PAGE */}
					<ProtectedRoute exact path="/posts/new">
						<CreatePostPage />
					</ProtectedRoute>

					{/* FIX FIX FIX */}
					<ProtectedRoute exact path="/posts/:postId(\d+)/edit">
						<EditPostForm />
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

					<ProtectedRoute path='/:handle' exact={true} >
						<ProfilePage />
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
