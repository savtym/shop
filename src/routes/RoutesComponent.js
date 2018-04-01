/*
*   import ./components/core
*/
import HomePage from 'components/core/homepage/HomePage';
import SignUp from 'components/core/signup/SignUp';
import User from "components/core/user/User";


const coreComponents = [{
	exact: true,
	path: '/',
	component: HomePage
}, {
	exact: true,
	path: '/signup',
	component: SignUp
}, {
	exact: true,
	path: '/signin',
	component: SignUp,
	props: {
		signin: true
	}
}, {
	exact: true,
	path: '/user',
	component: User,
	props: {
		signin: true
	}
}];


const commonComponents = [];

export default [].concat(
	coreComponents,
	commonComponents
);
