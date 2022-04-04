// ACTION VARIABLES ***************************************
const ADD_USER = "users/ADD_USER";
const ADD_FOLLOW = 'users/ADD_FOLLOW'
const REMOVE_FOLLOW = 'users/REMOVE_FOLLOW';

// ACTION CREATORS ****************************************
const addUser = (user) => {
  return {
    type: ADD_USER,
    user
  };
};

const addFollow = (sessionUser) => {
  return {
    type: ADD_FOLLOW,
    sessionUser
  }
}

const removeFollow = (sessionId) => {
  return {
    type: REMOVE_FOLLOW,
    sessionId
  }
}

// THUNK ACTION CREATORS **********************************
export const fetchUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/`);

  if (res.ok) {
    const user = await res.json();
    dispatch(addUser(user));
    return user;
  }
};

export const toggleUserFollow = (followedId) => async (dispatch) => {
  const res = await fetch(`/api/follow/`, {
    //`/api/user/${followedId}/follow/`
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(followedId)
  });

  if (res.ok) {
    const data = await res.json();
    if (data.status === 'deleted') {
      dispatch(removeFollow(data.followerId));
    } else {
      dispatch(addFollow(data));
    }
    return data;
  }
};

// REDUCER ************************************************
const userReducer = (state = {}, action) => {
  let newState;

  switch (action.type) {
    case ADD_USER: {
      // newState = { ...state };
      // newState[action.user.id] = action.user;
      return action.user

      // return newState;
    }

    case ADD_FOLLOW: {
      //followers of followed user
      const followersArray = Array.isArray(state.followers) ? [...state.followers] : [];

      return {
        ...state,
        followers: [action.sessionUser, ...followersArray]
      }
    }

    case REMOVE_FOLLOW: {
      state.followers.splice(state.followers.indexOf(state.followers.find(follower => follower.userId === action.sessionId)), 1);

      return {
        ...state,
        followers: [...state.followers]
      }
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
