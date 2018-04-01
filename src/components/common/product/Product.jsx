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
			isDisabled: false
		};

		this.handleClickByButton = this.handleClickByButton.bind(this);
		this.handleResponseFromServer = this.handleResponseFromServer.bind(this);
	}


	handleClickByButton(e) {
		store.dispatch(request({
			url: API_PRODUCT_CART + (this.props.isRemove ? 'remove' : 'add'),
			method: 'POST',
			body: {
				product_id: e.target.dataset.id,
				available_id: e.target.dataset.available_id
			},
			success: this.handleResponseFromServer
		}));

		this.setState({
			isDisabled: true
		})
	}


	handleResponseFromServer(response) {
		if (response) {
			this.setState({
				[this.props.isRemove ? 'isRemoved' : 'isAdded']: true
			});
		}
	}


	renderButton(id, available_id) {

		if (this.props.isRemove) {
			return (
				this.state.isRemove ?
					<div className="tooltip removed">
						<p>Removed</p>
					</div> :
					<button
						className='btn btn-remove-cart'
						data-id={id}
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
					data-id={id}
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
										<p>Counter: <span>{product.counter}</span></p>
										: ''
								}

							</div>

							<div className="footer-product">
								{this.renderButton(product.id, product.available_id)}
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
