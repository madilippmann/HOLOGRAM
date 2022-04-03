// import { csrfFetch } from "./csrf"; // ??? WILL WE BE DOING CSRF FETCHES AGAIN ???

// ACTION VARIABLES ***************************************
const ADD_USER = 'users/ADD_USER';


// ACTION CREATORS ****************************************
const addUser = (user) => {
  return {
    type: ADD_USER,
    user
  }
}


// THUNK ACTION CREATORS **********************************
export const fetchUser = userId => async dispatch => {
  const res = await fetch(`/api/users/${userId}`);

  if (res.ok) {
    const user = await res.json();
    dispatch(addUser(user));
    return user;
  }
}

export const toggleUserFollow = () => {

}

// REDUCER ************************************************
const usersReducer = (state = {}, action) => {
  let newState;

  switch (action.type) {

    case ADD_USER: {
      newState = { ...state };
      newState[action.user.id] = action.user;

      return newState;
    }

    default: {
      return state;
    }

  }
};

export default usersReducer;
