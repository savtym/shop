import React, {Component} from 'react';
import {connect} from 'react-redux';
import Validate from 'scripts/Validate';

import {setUser} from 'redux/actions/user';
import Preloader from "components/common/preloader/Preloader";
import request from "redux/actions/authAPI";
import './Signup.css';

const API_SIGNUP_GET_TOKEN = '/api/v1/signup';
const API_SIGNIN_GET_TOKEN = '/api/v1/signin';

const msgError = {
	email: 'Email is wrong',
	username: 'Login is wrong',
	password: 'Your password is wrong, you need to use min 8 symbols',
	repeatPassword: 'Password doesn\'t match'
};


class SignUp extends Component {

	constructor(props) {
		super(props);

		const redirect = props.history.location.state ? props.history.location.state : false;

		this.state = {
			email: '',
			password: '',
			isDisabledBtn: true,
			check: {
				isEmail: false,
				isPassword: false,
			},
			currentPage: redirect ? `${redirect.currentPage}${(redirect.search) ? redirect.search : ''}` : false
		};

		if (props.token) {
			this.props.history.push((this.state.currentPage) ? this.state.currentPage : '/');
		}


		if (!props.signin) {
			Object.assign(this.state, {
				username: '',
				repeatPassword: '',
				isDisabledRepeatPassword: true,
			});
			Object.assign(this.state.check, {
				isUsername: false,
				isRepeatPassword: false
			});
		}


		this.handlerClickForm = this.handlerClickForm.bind(this);
		this.handleChangeInput = this.handleChangeInput.bind(this);
		this.responseFromServer = this.responseFromServer.bind(this);
	}


	handleChangeInput(e) {

		let isOk;
		const dom = e.target;
		const value = dom.value;
		const state = this.state;
		const field = dom.dataset.field;
		const fieldCheck = `is${field.charAt(0).toUpperCase()}${field.substr(1)}`;

		switch (field) {
			case 'email':
				isOk = Validate.email(value);
				break;

			case 'username':
				isOk = Validate.userName(value);
				break;

			case 'password':
				isOk = Validate.password(value);
				state.isDisabledRepeatPassword = !isOk;
				break;

			case 'repeatPassword':
				isOk = Validate.repeatPassword(this.state.password, value);
				break;
		}

		dom.parentElement.parentElement.classList.add('check');

		state[field] = value;
		state.check[fieldCheck] = isOk;
		state.isDisabledBtn = !Object.keys(state.check).every(key => state.check[key]);

		this.setState(state);
	}


	handlerClickForm(e) {
		e.preventDefault();

		const {email, username, password, repeatPassword} = this.state;

		this.props.dispatch(request({
			method: 'POST',
			success: this.responseFromServer,
			body: {email, username, password, repeatPassword},
			url: this.props.signin ? API_SIGNIN_GET_TOKEN : API_SIGNUP_GET_TOKEN
		}));

		this.setState({
			isPreloader: true
		});
	}


	responseFromServer(user) {
		this.props.dispatch(setUser(user));
		this.props.history.push((this.state.currentPage) ? this.state.currentPage : '/');
	}


	renderInput(type, field, placeholder, isOk, isDisabled = false) {
		return (
			<div>
				<label className={isOk ? 'success' : 'err'}>
					<input
						type={type}
						value={this.state[field]}
						data-field={field}
						disabled={isDisabled}
						placeholder={placeholder}
						onChange={this.handleChangeInput}
					/>
					{isOk ? '' : <span className='tooltip'>{msgError[field]}</span>}
				</label>
			</div>
		);
	}


	render() {
		const {isDisabledBtn, check, isDisabledRepeatPassword} = this.state;

		return (
			<div className="c-signup">
				<h1>Sign up</h1>

				<form action="">
					{this.renderInput('email', 'email', 'Email', check.isEmail)}
					{
						this.props.signin || this.renderInput('text', 'username', 'Login', check.isUsername)
					}

					{this.renderInput('password', 'password', 'Password', check.isPassword)}
					{ this.props.signin ||
						this.renderInput(
							'password',
							'repeatPassword',
							'Repeat password',
							check.isRepeatPassword,
							isDisabledRepeatPassword
						)
					}

					<button onClick={this.handlerClickForm} disabled={isDisabledBtn}>Sign up</button>
				</form>

				{this.state.isPreloader ? <Preloader/> : ''}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state.user;
}

export default connect(mapStateToProps)(SignUp);
