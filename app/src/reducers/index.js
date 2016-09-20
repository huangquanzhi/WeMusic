import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import song from './song';
const rootReducer = combineReducers({
  routing: routerReducer,
  song
});

export default rootReducer;