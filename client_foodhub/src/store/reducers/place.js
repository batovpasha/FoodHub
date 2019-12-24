import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { ResourseStatus } from '../constants';

const initialState = fromJS({
    status: ResourseStatus.READY,
    list: [],
    error: undefined,
});

export const placeReducer = handleActions(
    {
        ADD_PLACE_START: state =>
            state.updateIn(['status'], () => ResourseStatus.LOADING),

        ADD_PLACE_FINISH: state =>
            state.updateIn(['status'], () => ResourseStatus.READY),
    },
    initialState
);
