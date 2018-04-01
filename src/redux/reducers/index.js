import { combineReducers } from 'redux';

import token from './token';
import burgerMenu from './burgerMenu';

export default combineReducers({
	token,
	burgerMenu
});
