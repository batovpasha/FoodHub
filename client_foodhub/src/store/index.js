import { rootReducer } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension'

import { createStore } from 'redux'

export default function configureStore(preloadedState) {
  // const middlewares = [];
  // const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
