import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
    getLocationsSuccess,
    getRestaurantsSuccess,
} from '../actions';

const initialState = fromJS({
    store: [],
    locations: [],
});

export const restaurantReducer = handleActions(
    {
        [getLocationsSuccess]: (state, { payload: { locations } }) => state.set('locations', locations),
        [getRestaurantsSuccess]: (state, { payload: { restaurants } }) => state.set('store', restaurants)
    },
    initialState
);

