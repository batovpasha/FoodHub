import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { FakeUserApiService, AuthService } from '../services';
import { rootReducer } from './reducers';
import { signInSuccess, signInFailure} from './actions';

export default function configureStore(preloadedState) {
    const api = new FakeUserApiService(new AuthService());

    const composedEnhancers = composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument({ api }))
    );

    const store = createStore(rootReducer, preloadedState, composedEnhancers);

    api.getUser()
        .then(user => store.dispatch(signInSuccess(user)))
        .catch(() => store.dispatch(signInFailure()))

    return store;
}

export * from './actions';
export * from './commands';
export * from './selectors';
