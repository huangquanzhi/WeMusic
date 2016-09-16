import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configStore from './src/store';
import RouteManager from './src/RouteManager.js';
import DevTools from './src/DevTools';
import 'babel-polyfill';

const store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <DevTools/>
      <RouteManager/>
    </div>
  </Provider>,
  document.getElementById('root')
);
