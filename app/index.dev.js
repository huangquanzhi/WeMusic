import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configStore from './src/store';
import RouteManager from './src/RouteManager.js';
import DevTools from './src/DevTools';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import 'babel-polyfill';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import 'expose?$!expose?jQuery!jquery';
import "bootstrap-webpack";
import './assets/css/player.css';
import './assets/css/main.css';


const store = configStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <DevTools/>
            <MuiThemeProvider>
                <RouteManager history={history}/>
            </MuiThemeProvider>
        </div>
    </Provider>,
    document.getElementById('root')
);
