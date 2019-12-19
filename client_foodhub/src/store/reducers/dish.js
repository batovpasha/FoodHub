import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
    getDishesSuccess,
} from '../actions';

const initialState = fromJS({
    store: [],
    selected: [],
});

export const dishReducer = handleActions(
    {
        [getDishesSuccess]: (state, { payload: { dishes } }) => state.set('store', dishes),
    },
    initialState
);

