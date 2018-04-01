import { combineReducers } from 'redux';

import user from './user';
import modalError from './modalError';
import burgerMenu from './burgerMenu';

export default combineReducers({
	user,
	modalError,
	burgerMenu
});
