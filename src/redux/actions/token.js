export const GET_TOKEN = 'GET_TOKEN';
export const SET_TOKEN = 'SET_TOKEN';
export const TOKEN = 'TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export function token() {
  return { type: TOKEN };
}

export function getToken() {
  return { type: GET_TOKEN };
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token
  };
}

export function removeToken() {
	return { type: REMOVE_TOKEN };
}
