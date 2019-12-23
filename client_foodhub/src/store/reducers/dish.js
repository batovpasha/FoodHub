import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
    getDishesStart,
    getDishesSuccess,
    getDishesFail,

    selectDish,
    removeSelectedDishById,
    removeAllSelectedDishesById
} from '../actions';

import { ResourseStatus } from '../constants';

const initialState = fromJS({
    status: ResourseStatus.LOADING,
    store: [],
    selected: {},
});

// if count provided - set count to this value, else - decrease count by 1
const getCount = (id, state) => state.getIn(['selected', id, 'count']) - 1;

export const dishReducer = handleActions(
    {
        [getDishesStart]: state => state
            .set('status', ResourseStatus.LOADING),
        [getDishesFail]: state => state
            .set('status', ResourseStatus.ERROR),
        [getDishesSuccess]: (state, { payload: { dishes } }) => state
            .set('store', dishes)
            .set('status', ResourseStatus.READY),
        [selectDish]: (state, { payload: { dishId, count } }) => state
            .setIn(['selected', dishId, 'status'], true)
            .setIn(['selected', dishId, 'count'], count),
        [removeAllSelectedDishesById]: (state, { payload: { dishId } }) => state
            .setIn(['selected', dishId, 'status'], false)
            .setIn(['selected', dishId, 'count'], 0),
        [removeSelectedDishById]: (state, { payload: { dishId } }) => state
            .setIn(['selected', dishId, 'status'], getCount(dishId, state) > 0)
            .setIn(['selected', dishId, 'count'], getCount(dishId, state)),
    },
    initialState
);

