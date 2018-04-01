import { TOKEN, USERNAME, EMAIL, GET_USER, SET_USER, REMOVE_TOKEN } from '../actions/user';

const initialState = {
	token: localStorage.getItem(TOKEN),
	username: localStorage.getItem(USERNAME),
	email: localStorage.getItem(EMAIL)
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
      	token: state.token,
				email: state.email,
				username: state.username
      };

    case SET_USER:
    	const {token, email, username} = action.user;
      localStorage.setItem(TOKEN, token);
      localStorage.setItem(USERNAME, username);
      localStorage.setItem(EMAIL, email);
      return {token, email, username};

		case REMOVE_TOKEN:
			localStorage.removeItem(TOKEN);
			return {
				token: null,
				email: state.email,
				username: state.username
			};

    default:
      return state;
  }
}
