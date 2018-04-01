import { TOKEN, GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '../actions/token';

const initialState = { token: localStorage.getItem(TOKEN) };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return { token: state.token };

    case SET_TOKEN:
      localStorage.setItem(TOKEN, action.token);
      return { token: action.token };

		case REMOVE_TOKEN:
			localStorage.removeItem(TOKEN);
			return { token: null };

    default:
      return state;
  }
}
