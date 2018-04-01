import { RSAA } from 'redux-api-middleware';


export default store => next => action => {
  const callApi = action[RSAA];

  // Check if this action is a redux-api-middleware action.
  if (callApi) {
		const {token} = store.getState().user;
    // const token = store.getState().token.token;
    // Inject the Authorization nav from localStorage.
		callApi.headers = Object.assign({}, callApi.headers, {
			Authorization: token ? `Bearer ${token}` : '',
			'Access-Control-Expose-Headers': 'location'
		});
  }

  // Pass the FSA to the next action.
  return next(action);
}
