import {RSAA} from 'redux-api-middleware';
import {history, store} from 'index';
import {setContent} from './modalError';
import {removeToken} from './user';

import config from 'config/config';

/*
    For details: https://www.npmjs.com/package/redux-api-middleware
*/

export default function request({
																	url,
																	body,
																	error,
																	success,
																	method = 'GET' // GET, HEAD, POST, PUT, PATCH, DELETE OR OPTIONS
																}) {
	return {
		[RSAA]: {
			endpoint: config.apiDomain + url,
			// Don't have to manually add the Authorization nav to every request.
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(body),
			method: method,
			types: ['REQUEST',
				{
					type: 'SUCCESS',
					payload: (action, state, res) => {
						return res.json().then(json => {
							return !success || success(json)
						});
					}
				}, {
					type: 'FAILURE',
					payload: (action, state, res) => {
						if (config.serverResponseStatus[res.status]) {
							if (res.status === 401) {
								store.dispatch(removeToken());
							}
							history.push(config.serverResponseStatus[res.status]);
						}

						return res.json().then(json => {
							if (error) {
								error(json);
							} else {
								return store.dispatch(setContent(json, res.url));
							}
						});
					}
				}]
		}
	}
}
