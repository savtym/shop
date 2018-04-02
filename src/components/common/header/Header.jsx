import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {removeToken} from 'redux/actions/user';

import './Header.css';
import Nav from 'components/common/nav/Nav';
import ModalError from 'components/common/modalError/ModalError';
import navList from 'components/common/nav/navList';

class Header extends Component {

	constructor(props) {
		super(props);

		this.handleCLickUser = this.handleCLickUser.bind(this);
	}


	static handleChangeNav({isOpen}) {
		document.querySelector('main').classList[isOpen ? 'add' : 'remove']('active');
	}


	handleCLickUser() {

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

					{
						this.props.token ?
							<Link to='/user'>{this.props.username}</Link> :
							<Link to='/signin'>Sign in</Link>
					}

				</div>

				<ModalError />

			</header>
		);
	}
}


function mapStateToProps(state) {
	return state.user;
}

export default connect(mapStateToProps)(Header);
