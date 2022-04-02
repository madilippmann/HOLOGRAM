import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import * as postsActions from '../store/posts'

function UsersList() {
  // const dispatch = useDispatch();

  const [users, setUsers] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.handle}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
