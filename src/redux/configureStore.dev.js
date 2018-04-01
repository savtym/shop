import { applyMiddleware, createStore, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import DevTools from '../components/common/devTools/DevTools';
import rootReducer from './reducers';


import apiAuth from './reducers/authAPI';

export default function (initialState = {}) {
	const store = createStore(rootReducer, initialState, compose(
		applyMiddleware(
			apiAuth,
			apiMiddleware
		),
		DevTools.instrument()
		)
	);

	if (module.hot) {
		module.hot.accept('./reducers', () =>
			store.replaceReducer(require('./reducers').default)
		);
	}

	return store;
}
