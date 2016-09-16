import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configStore from './src/store';
import RouteManager from './src/RouteManager.js';

const store = configStore();

ReactDOM.render(
  <Provider store={store}>
      <RouteManager/>
  </Provider>,
  document.getElementById('root')
);
