import React, {Component} from 'react';

import './HomePage.css';
import {store} from 'index';
import Product from "components/common/product/Product";
import Preloader from "components/common/preloader/Preloader";
import request from "redux/actions/authAPI";

const API_GET_PRODUCTS = '/api/v1/products';


class HomePage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isPreloader: true
		};


		store.dispatch(request({
			url: API_GET_PRODUCTS,
			success: this.responseFromServer.bind(this)
		}));

	}


	responseFromServer(products) {
		this.setState({
			products,
			isPreloader: false
		});
	}


	render() {
		if (this.state.isPreloader) return (<div className="c-homepage"><Preloader/></div>);

		return (
			<div className="c-homepage">
				<h2>Phones</h2>

				<div className="row">
				{
					this.state.products.map((product, key) =>
						product.available.map((available, keyChild) =>
							<Product
								key={`${key}_${keyChild}`}
								product={product}
								color={available.color}
								price={available.price}
								storage={available.storage}
							/>
						)
					)
				}
				</div>
			</div>
		);
	}
}


export default HomePage;
