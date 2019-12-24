import { fromJS, List } from 'immutable';
import { handleActions, combineActions } from 'redux-actions';
import { ResourseStatus } from '../constants';
import {
    addPlaceStart,
    deletePlaceStart,
    addPlaceFinish,
    deletePlaceFinish,
} from '../actions/place';

const initialState = fromJS({
    status: ResourseStatus.READY,
    list: [],
    error: undefined,
});

export const placeReducer = handleActions(
    {
        [combineActions(addPlaceStart, deletePlaceStart)]: state =>
            state.updateIn(['status'], () => ResourseStatus.LOADING),

        [combineActions(addPlaceFinish, deletePlaceFinish)]: state =>
            state.updateIn(['status'], () => ResourseStatus.READY),

        FETCH_PLACES_START: state =>
            state.updateIn(['status'], () => ResourseStatus.LOADING),

        FETCH_PLACES_SUCCESS: (state, { payload: { places } }) =>
            state
                .updateIn(['list'], () => new List(places))
                .updateIn(['status'], () => ResourseStatus.READY)
                .updateIn(['error'], () => undefined),

        FETCH_PLACES_FAILURE: (state, { payload: { error } }) =>
            state
                .updateIn(['error'], () => error)
                .updateIn(['status'], () => ResourseStatus.ERROR),
    },
    initialState
);
