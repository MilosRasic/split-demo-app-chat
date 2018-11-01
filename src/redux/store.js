import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import ads from './reducers/messages';

const middlewares = [thunkMiddleware];

let composeEnhancers = compose;

composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'Split Demo Chat' })
	: compose;

export default createStore(ads, composeEnhancers(applyMiddleware(...middlewares)));
