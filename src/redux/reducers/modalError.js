import { CLOSE_MODAL, SET_CONTENT_MODAL } from '../actions/modalError';

const initialState = {
	isOpen: false,
	content: ''
};


export default (state = initialState, action) => {
	switch (action.type) {
		case CLOSE_MODAL:
			return {isOpen: false};

		case SET_CONTENT_MODAL:
			const {content, uri} = action;
			return {isOpen: true, content, uri};


		default:
			return state;
	}
}
