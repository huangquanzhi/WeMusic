import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configStore from './src/store';
import RouteManager from './src/RouteManager.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import 'babel-polyfill';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'


const store = configStore();
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <RouteManager history={history}/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
