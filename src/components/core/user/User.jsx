import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './User.css';
import Preloader from "components/common/preloader/Preloader";
import request from "redux/actions/authAPI";
import Product from "components/common/product/Product";

const API_CLEAR_CART = '/api/v1/cart/clear';
const API_GET_PRODUCTS_CART = '/api/v1/cart/';


class User extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isPreloader: true,
			isDisabledClearCart: false
		};


		this.responseFromServer = this.responseFromServer.bind(this);
		this.handleClickByClearCart = this.handleClickByClearCart.bind(this);
		this.responseFromServerClearCart = this.responseFromServerClearCart.bind(this);

		props.dispatch(request({
			method: 'POST',
			url: API_GET_PRODUCTS_CART,
			success: this.responseFromServer
		}))

	}


	responseFromServer(products) {
		this.setState({
			products,
			isPreloader: false
		});
	}


	responseFromServerClearCart(response) {
		if (response) {
			this.setState({
				products: []
			});
		}
	}


	handleClickByClearCart() {
		this.props.dispatch(request({
			method: 'POST',
			url: API_CLEAR_CART,
			success: this.responseFromServerClearCart
		}));

		this.setState({
			isDisabledClearCart: true
		});
	}


	render() {
		if (this.state.isPreloader) return (<div className="c-user"><Preloader/></div>);

		return (
			<div className="c-user">
				<h1>Welcome, {this.props.username}!</h1>

				<div className="cart">
					<h2>Your cart</h2>

					<button
						className="btn btn-clear-cart"
						onClick={this.handleClickByClearCart}
						disabled={this.state.isDisabledClearCart}
					>
						Clear cart
					</button>

					<div className="row">
					{
						this.state.products.map((product, key) =>
							<Product
								key={key}
								product={product}
								isRemove={true}
								color={product.available.color}
								price={product.available.price}
								storage={product.available.storage}
							/>
						)
					}
					</div>

					{
						this.state.products.length === 0 ?
							<div className="msg">
								<p className='msg'>You don't have products in your cart.</p>
								<Link to='/'>Go to shop!</Link>
							</div>
						: ''
					}
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return state.user;
}

export default connect(mapStateToProps)(User);
