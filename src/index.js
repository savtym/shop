import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';

import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import { Provider } from 'react-redux';
import Routes from './routes/Routes';
import configureStore from './redux/configureStore';

import DevTools from './components/common/devTools/DevTools';

import registerServiceWorker from './registerServiceWorker';

const initialState = window.REDUX_INITIAL_STATE || {};

const store = configureStore(initialState);
const history = createHistory();

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Routes/>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<Index/>, document.getElementById('root') || document.createElement('div'));

if (process.env.REACT_APP_DEV_DEBUG === 'debug') {
  const dom = document.createElement('div');
  dom.id = 'dev-tools';
  document.body.appendChild(dom);

  ReactDOM.render(<DevTools store={store}/>, document.getElementById('dev-tools'));
}

registerServiceWorker();

export { Index, store, history };
