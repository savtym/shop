import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './User.css';
import Preloader from "components/common/preloader/Preloader";
import request from "redux/actions/authAPI";
import Product from "components/common/product/Product";

const API_GET_PRODUCTS_CART = '/api/v1/cart/';


class User extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isPreloader: true
		};


		this.responseFromServer = this.responseFromServer.bind(this);

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


	render() {
		if (this.state.isPreloader) return (<div className="c-user"><Preloader/></div>);

		return (
			<div className="c-user">
				<h1>Welcome, {this.props.username}!</h1>

				<div className="cart">
					<h2>Your cart</h2>

					<div className="row">
					{
						this.state.products.map((product, key) =>
							<Product
								key={`${key}_${keyChild}`}
								product={product}
								isRemove={true}
								color={available.color}
								price={available.price}
								storage={available.storage}
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
