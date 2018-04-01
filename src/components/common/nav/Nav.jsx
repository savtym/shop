import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import { slide as Menu } from 'react-burger-menu';
import {decorator as reduxBurgerMenu} from 'redux-burger-menu';

import navList from './navList';
import './Nav.css';


class Nav extends Component {

	constructor(props) {
		super(props);

		this.state = {
			curPath: window.location.pathname
		};

		this.onStateChange = this.onStateChange.bind(this);
		this.handleClickLinkMenu = this.handleClickLinkMenu.bind(this);
	}


	onStateChange(state) {
		this.props.onStateChange(state);
		!this.props.handleChangeState || this.props.handleChangeState(state);
	}


	handleClickLinkMenu(e) {
		e.stopPropagation();
		this.setState({
			curPath: e.target.getAttribute('href')
		});
	}

	render() {
		return (
			<div className="c-nav">
				<Menu
					isOpen={this.props.isOpen}
					onStateChange={this.onStateChange}
				>
					<ul>
						{
							navList.map((item, index) =>
								<li className={((item.url === this.state.curPath) ? 'active' : '')} key={index}>
									<Link to={item.url} onClick={this.handleClickLinkMenu}>
										<i className={item.icon} />
										{item.title}
									</Link>
								</li>
							)
						}
					</ul>
				</Menu>
			</div>
		);
	}
}

export default reduxBurgerMenu(Nav, 'primary');
