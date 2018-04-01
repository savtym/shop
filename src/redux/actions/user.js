export const GET_USER = 'GET_USER';
export const SET_USER = 'SET_USER';
export const TOKEN = 'TOKEN';
export const USERNAME = 'USERNAME';
export const EMAIL = 'EMAIL';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export function token() {
  return { type: TOKEN };
}

export function getUser() {
  return { type: GET_USER };
}

export function setUser(user) {
  return {
    type: SET_USER,
		user
  };
}

export function removeToken() {
	return { type: REMOVE_TOKEN };
}
