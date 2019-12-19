import { fromJS } from 'immutable';
import { handleActions, combineActions } from 'redux-actions';

import {
    getLocationsSuccess,

    getRestaurantsStart,
    getRestaurantsSuccess,
    getRestaurantsFail,
} from '../actions';

import { ResourseStatus } from '../constants';

const initialState = fromJS({
    status: ResourseStatus.LOADING,
    store: [],
    locations: [],
});

export const restaurantReducer = handleActions({
        [combineActions(getRestaurantsStart)]: state => state
            .set('status', ResourseStatus.LOADING),

        [combineActions(getRestaurantsFail)]: state => state
            .set('status', ResourseStatus.ERROR),

        [getRestaurantsSuccess]: (state, { payload: { restaurants } }) => state
            .set('status', ResourseStatus.READY)
            .set('store', restaurants),
        [getLocationsSuccess]: (state, { payload: { locations } }) => state
            .set('status', ResourseStatus.READY)
            .set('locations', locations),
    },
    initialState
);

