import { fromJS } from 'immutable';
import { handleActions, combineActions } from 'redux-actions';

import {
    signInSuccess,
    signUpSuccess,
    signInFailure,
    signUpFailure,
    signInStart,
    signUpStart
 } from '../actions';
import { ResourseStatus } from '../constants';

const initialState = fromJS({
    status: ResourseStatus.LOADING,
    data: {
        firstName: undefined,
        lastName: undefined,
        email: undefined
    },
    error: undefined
});

export const userReducer = handleActions({
        [combineActions(signInSuccess, signUpSuccess)]: (state, { payload }) => state
            .updateIn(['status'], () => ResourseStatus.READY)
            .updateIn(['data'], data => ({ ...data, ...payload }))
            .updateIn(['error'], () => undefined),

        [combineActions(signInFailure, signUpFailure)]: (state, { payload: { error } }) => state
            .updateIn(['status'], () => ResourseStatus.ERROR)
            .updateIn(['error'], () => error),

        [combineActions(signInStart, signUpStart)]: state => state
            .updateIn(['status'], () => ResourseStatus.LOADING),

        SIGN_OUT_SUCCESS: () => initialState
    },
    initialState
);

