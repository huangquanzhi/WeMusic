import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import song from './song';
import application from './application';

const rootReducer = combineReducers({
    routing: routerReducer,
    song,
    application
});

export default rootReducer;