import { applyMiddleware, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from './reducers';

export default function (initialState = {}) {
  return createStore(rootReducer, initialState, applyMiddleware(
    apiMiddleware
  ));
}
