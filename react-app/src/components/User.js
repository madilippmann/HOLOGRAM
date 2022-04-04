import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as userActions from '../store/user'
import * as sessionActions from '../store/session'

function User() {
  const dispatch = useDispatch();
  // const [user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false)
  const { userId }  = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const user = useSelector(state => state.user);
  const [isFollowed, setIsFollowed] = useState(user?.followers?.find(user => user.id === sessionUser.id) ? true : false);

  useEffect(() => {
    (async () => {
      dispatch(userActions.fetchUser(userId));
      setIsLoaded(true);
    })();
  }, [userId, dispatch]);

  if (!user) {
    return null;
  }

  const toggleFollow = (e) => {
    dispatch(userActions.toggleUserFollow(+userId));
    dispatch(sessionActions.fetchUser(sessionUser.id));
    setIsFollowed(() => !isFollowed);
  }

  return !isLoaded ? null : (
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Handle</strong> {user.handle}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
      <li>
        {isFollowed
          ? <button onClick={toggleFollow}>Unfollow</button>
          : <button onClick={toggleFollow}>Follow</button>
        }
      </li>
    </ul>
  );
}
export default User;
