import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { increment, decrement } from './actions';

const initialState = fromJS({
    store: {
        counter: 0
    }
});

export const rootReducer = handleActions(
    {
        [increment]: (state, { payload: { amount } }) =>
            state.updateIn(['store', 'counter'], counter => counter + amount),
        [decrement]: (state, { payload: { amount } }) =>
            state.updateIn(['store', 'counter'], counter => counter - amount),
    },
    initialState
);

