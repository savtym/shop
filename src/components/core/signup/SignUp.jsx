import React, {Component} from 'react';
import {connect} from 'react-redux';
import Validate from 'scripts/Validate';


import Preloader from "components/common/preloader/Preloader";
import request from "redux/actions/authAPI";

import './Signup.css';

const API_GET_TOKEN = '/api/v1/signup';

const msgError = {
	email: 'Email is wrong',
	userName: 'Login is wrong',
	password: 'Your password is wrong, you need to use min 8 symbols',
	repeatPassword: 'Password doesn\'t match'
};


class SignUp extends Component {

	constructor(props) {
		super(props);

		const redirect = props.history.location.state ? props.history.location.state : false;

		this.state = {
			email: '',
			userName: '',
			password: '',
			repeatPassword: '',
			isDisabledBtn: true,
			isDisabledRepeatPassword: true,
			check: {
				isEmail: false,
				isUserName: false,
				isPassword: false,
				isRepeatPassword: false,
			},
			currentPage: redirect ? `${redirect.currentPage}${(redirect.search) ? redirect.search : ''}` : false
		};

		this.handlerClickForm = this.handlerClickForm.bind(this);
		this.handleChangeInput = this.handleChangeInput.bind(this);
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

			case 'userName':
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

		const {email, userName, password, repeatPassword} = this.state;

		this.props.dispatch(request({
			data: {email, userName, password, repeatPassword},
			url: API_GET_TOKEN,
			success: function (response) {
				debugger
			},
			error: (response) => {
				console.error(response);
			}
		}));


		this.setState({
			isPreloader: true
		});


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
					{this.renderInput('text', 'userName', 'Login', check.isUserName)}
					{this.renderInput('password', 'password', 'Password', check.isPassword)}
					{
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
	return state.token;
}

export default connect(mapStateToProps)(SignUp);
