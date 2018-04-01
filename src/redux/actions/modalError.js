export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_CONTENT_MODAL = 'SET_CONTENT_MODAL';


export function setContent(content, uri) {
	return {
		uri,
		content,
		type: SET_CONTENT_MODAL
	};
}


export function close() {
	return {
		type: CLOSE_MODAL
	};
}
