import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {store, history} from 'index';
import {removeToken} from 'redux/actions/token';

import './Header.css';
import navList from 'components/common/nav/navList';
import Nav from 'components/common/nav/Nav';

class Header extends Component {

	static handleChangeNav({isOpen}) {
		document.querySelector('main').classList[isOpen ? 'add' : 'remove']('active');
	}


	static handleCLickLogout() {
		store.dispatch(removeToken());
		history.push('/', {
			currentPage: window.location.pathname,
			search: window.location.search
		});
	}


	render() {
		const curPage = navList.find(path => path.url === window.location.pathname);
		return (
			<header className="c-header">
				<div className="left">
					<div className="c-logo"><Link to='/' className='logo'/></div>
					<Nav handleChangeState={Header.handleChangeNav}/>

					<ul>
						<li>{ curPage ? curPage.title : '' }</li>
					</ul>
				</div>

				<div className="right">
					<button className='logout' onClick={Header.handleCLickLogout}>Logout</button>
				</div>

			</header>
		);
	}
}

export default Header;
