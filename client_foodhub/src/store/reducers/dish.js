import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
    getDishesStart,
    getDishesSuccess,
    getDishesFail,

    pickDish,
    removeDish,
} from '../actions';

import { ResourseStatus } from '../constants';

const initialState = fromJS({
    status: ResourseStatus.LOADING,
    store: [],
    selected: {},
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

        [pickDish]: (state, { payload: { dishId, count } }) => state
            .setIn(['selected', dishId, 'status'], true)
            .setIn(['selected', dishId, 'count'], count),
        [removeDish]: (state, { payload: { dishId, count } }) => state
            .setIn(['selected', dishId, 'status'], state.getIn(['selected', dishId, 'count']) - count > 0 )
            .updateIn(['selected', dishId, 'count'], x => x - count),
    },
    initialState
);

