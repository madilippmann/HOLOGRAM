import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import PostsList from './components/PostsList';
import { authenticate } from './store/session';
import ProfilePage from './components/ProfilePage';
import Post from './components/Post';
import PostForm from './components/PostForm';
import EditPostForm from './components/EditPostForm';

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
      <NavBar />
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
        <ProtectedRoute path='/posts' exact={true} >
          <PostsList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          {/* <User /> */}
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>

        {/* FOR TESTING THE POST FORM PAGE */}
        <ProtectedRoute exact path="/posts/new">
          <PostForm />
        </ProtectedRoute>

        {/* FIX FIX FIX */}
        <ProtectedRoute exact path="/posts/:postId/edit">
          <EditPostForm />
        </ProtectedRoute>

        {/* FOR TESTING THE POST PAGE (WILL BE MODAL LATER) */}
        <ProtectedRoute exact path="/posts/:postId">
          <Post />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
