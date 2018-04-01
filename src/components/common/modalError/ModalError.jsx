import React, { Component } from 'react';
import {connect} from 'react-redux';
import ModalView from 'react-modal';

import './ModalError.css';
import {close} from 'redux/actions/modalError';


class ModalError extends Component {

	constructor(props) {
		super(props);
		this.closeModal = this.closeModal.bind(this);
	}


	closeModal() {
		this.props.dispatch(close());
	}


	render() {
		return (
			<ModalView
				isOpen={ this.props.isOpen}
				onRequestClose={ this.closeModal }
				className={"container c-modal error-modal"}
				contentLabel="ModalError"
			>
				<button className="modal-close" onClick={this.closeModal}>×</button>
				<div className="modal-header">
					<h2>Error handling from server</h2>
				</div>

				<div className="modal-content">
					<p>{this.props.content}</p>
				</div>

				<div className="modal-footer">
					<p>URI: <span>{this.props.uri}</span></p>
				</div>
			</ModalView>
		);
	}
}


function mapStateToProps(state) {
	return state.modalError;
}

export default connect(mapStateToProps)(ModalError);
