import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import song from './song';
import application from './application';
import user from './user';
import uploads from './uploads';

const rootReducer = combineReducers({
    routing: routerReducer,
    song,
    application,
    user,
    uploads
});

export default rootReducer;