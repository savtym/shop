import React, {Component} from 'react';
import {store} from 'index';

import './Product.css';
import request from 'redux/actions/authAPI';
import defaultImage from 'images/default-image.png';

const API_PRODUCT_CART = '/api/v1/cart/';


class Product extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isAdded: false,
			isRemove: false,
			isDisabled: false,
			counter: props.product.counter
		};

		this.handleClickByButton = this.handleClickByButton.bind(this);
		this.handleResponseFromServer = this.handleResponseFromServer.bind(this);
	}


	handleClickByButton(e) {
		const {product_id, available_id} = e.target.dataset;

		store.dispatch(request({
			url: API_PRODUCT_CART + (this.props.isRemove ? 'remove' : 'add'),
			method: 'POST',
			body: {product_id, available_id},
			success: this.handleResponseFromServer
		}));

		this.setState({
			isDisabled: true
		})
	}


	handleResponseFromServer(response) {
		if (response) {
			const state = this.state;

			state[this.props.isRemove ? 'isRemove' : 'isAdded'] = true;
			state.isDisabled = false;

			if (this.props.isRemove) {
				state.counter -= 1;
			}

			this.setState(state);
		}
	}


	renderButton(product_id, available_id, counter) {
		if (this.props.isRemove) {
			return (
				counter === 0 && this.state.isRemove ?
					<div className="tooltip removed">
						<p>Removed</p>
					</div> :
					<button
						className='btn btn-remove-cart'
						data-product_id={product_id}
						data-available_id={available_id}
						disabled={this.state.isDisabled}
						onClick={this.handleClickByButton}
					>Remove from cart</button>
			);
		}


		return (
			this.state.isAdded ?
				<div className="tooltip added">
					<p>Added</p>
				</div> :
				<button
					className='btn btn-add-cart'
					data-product_id={product_id}
					data-available_id={available_id}
					disabled={this.state.isDisabled}
					onClick={this.handleClickByButton}
				>Add to cart</button>
		);
	}


	render() {
		const {product} = this.props;

		return (
			<div className="c-product col-3-4">
				<div className="content">
					<div className="block-image">
						<img src={defaultImage} alt="default-image"/>
					</div>

					{	this.props.storage ?
						<div className="block-info">
							<h3>{product.manufacture} <span>{product.model}</span></h3>

							<div className="description">
								<p>RAM: <span>{product.ram}</span></p>
								<p>Diagonal: <span>{product.screen_diagonal}</span></p>
								<p>Camera: <span>{product.camera}</span></p>
								<p>Color: <span>{this.props.color}</span></p>

								{
									this.props.isRemove ?
										<p>Counter: <span>{this.state.counter}</span></p>
										: ''
								}

							</div>

							<div className="footer-product">
								{this.renderButton(product.product_id, product.available_id, this.state.counter)}
								<p className='price'>{this.props.price} uah</p>
							</div>
						</div> :
						<div className="block-info">
							<h2>Not available</h2>
						</div>
					}

				</div>
			</div>
		);
	}
}

export default Product;
