import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import song from './song';
import application from './application';
import user from './user';

const rootReducer = combineReducers({
    routing: routerReducer,
    song,
    application,
    user
});

export default rootReducer;