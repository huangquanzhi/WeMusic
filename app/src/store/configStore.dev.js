import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import DevTools from '../DevTools';

const middleware = [logger(), thunk];

const enhancer = compose(
  applyMiddleware(...middleware),
  DevTools.instrument()
);

export default function configStore(initialState) {

  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
    );
  }

  return store;
}