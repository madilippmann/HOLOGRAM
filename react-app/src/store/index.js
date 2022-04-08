import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from './posts';
import session from './session'
import userReducer from './user';
import messagesReducer from './messages'
import { loadingBarReducer } from 'react-redux-loading-bar';

const rootReducer = combineReducers({
	session,
	posts: postsReducer,
	user: userReducer,
	messages: messagesReducer,
	loadingBar: loadingBarReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require('redux-logger').default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
