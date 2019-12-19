import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
    getDishesStart,
    getDishesSuccess,
    getDishesFail,
} from '../actions';

import { ResourseStatus } from '../constants';

const initialState = fromJS({
    status: ResourseStatus.LOADING,
    store: [],
    selected: [],
});

export const dishReducer = handleActions(
    {
        [getDishesStart]: state => state
            .set('status', ResourseStatus.LOADING),
        [getDishesFail]: state => state
            .set('status', ResourseStatus.ERROR),
        [getDishesSuccess]: (state, { payload: { dishes } }) => state
            .set('store', dishes)
            .set('status', ResourseStatus.READY),
    },
    initialState
);

