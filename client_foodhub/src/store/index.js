import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import configureServices from '../services';

import { rootReducer } from './reducers';
import { signInSuccess, signInFailure} from './actions';

export default function configureStore(preloadedState) {
    const services = configureServices();

    const composedEnhancers = composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(services))
    );

    const store = createStore(rootReducer, preloadedState, composedEnhancers);

    services.userAPI.getUser()
        .then(user => store.dispatch(signInSuccess(user)))
        .catch(() => store.dispatch(signInFailure()))

    return store;
}

export * from './actions';
export * from './commands';
export * from './selectors';
