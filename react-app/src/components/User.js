import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as userActions from '../store/users'

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const sessionUser = useSelector(state => state.session.user);

  let isFollowed = user?.followers?.find(user => user.id === sessionUser.id) ? true : false

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  const toggleFollow = (e) => {
    dispatch(userActions.toggleUserFollow(+userId))
    //TODO ADD ANOTHER DISPATCH TO UPDATE LISTS OF FOLLOWERS AND FOLLOWED
  }

  return (
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
