import React from 'react';
import ReactDOM from 'react-dom';
import {Index} from './index';

it('renders without crashing', () => {
  ReactDOM.render(<Index />, document.createElement('div'));
});
