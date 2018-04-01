/*
*   import ./components/core
*/
import HomePage from 'components/core/homepage/HomePage';
import SignUp from 'components/core/signup/SignUp';


const coreComponents = [{
	exact: true,
	path: '/',
	component: HomePage
}, {
	exact: true,
	path: '/signup',
	component: SignUp
}];


const commonComponents = [];

export default [].concat(
	coreComponents,
	commonComponents
);
