import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';


const middleware = [thunk];

const enhancer = compose(
  applyMiddleware(...middleware),
);

export default function configStore(initialState) {

  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}