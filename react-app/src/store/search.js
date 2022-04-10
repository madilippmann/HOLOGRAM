// ACTION VARIABLES ***************************************
const LOAD_SEARCH = 'session/LOAD_SEARCH';


// ACTION CREATORS ****************************************
const loadSearch = (results) => {
    return {
        type: LOAD_SEARCH,
        results
    }
}

// THUNK ACTION CREATORS **********************************
export const fetchQuery = (query, onlyUsers=false) => async dispatch => {
    let res
    if (onlyUsers) {
        res = await fetch(`/api/search/users/${query}/`);
    } else {
        res = await fetch(`/api/search/${query}/`);
    }

    if (res.ok) {
        const results = await res.json();
        dispatch(loadSearch(results));
        return results;
    }
}

// REDUCER ************************************************
const searchReducer = (state = [], action) => {
    
    switch (action.type) {
        
        case LOAD_SEARCH: {
            // remove duplicates here
            return [...state, ...action.results];
        }

        default: {
            return state;
        }
    }
};

export default searchReducer;
