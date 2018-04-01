import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';

import config from 'config/config';

import routesAPI from './RoutesAPI';
import routesComponents from './RoutesComponent';

import Header from 'components/common/header/Header';


const Root = (props) => (
	<div {...props}/>
);

const ScrollToTop = () => {
	window.scrollTo(0, 0);
	return null;
};

class Routes extends Component {

	render() {
		return (
			<Root className="site" id="outer-container">
				<Header/>

				<main>
					{
						routesComponents.map((item, index) => (
							<Route
								key={index}
								path={item.path}
								exact={item.exact}
								component={props => React.createElement(item.component, Object.assign({}, props, item.props))}
							/>
						))
					}

					{
						(config.environment !== 'master') ?
							routesAPI.map((item, index) => (
								<Route
									key={index}
									path={item.path}
									exact={item.exact}
									component={props => {
										if (item.redirect) {
											const prevSearch = props.location.search;
											return (<Redirect to={{
												pathname: item.redirect,
												state: Object.assign({}, item.props, {prevSearch})
											}}/>);
										} else {
											return React.createElement(item.component, Object.assign({}, props, item.props));
										}
									}}/>
							)) : ''
					}
				</main>

				<ScrollToTop/>
			</Root>
		);
	}
}

export default Routes;
