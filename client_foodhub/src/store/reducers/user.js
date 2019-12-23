import { fromJS } from 'immutable';
import { handleActions, combineActions } from 'redux-actions';

import {
    signInSuccess,
    signUpSuccess,
    signInFailure,
    signUpFailure,
    signInStart,
    signUpStart,
    changeUserRoleStart,
    changeUserRoleFailure,
    changePasswordStart,
    changePasswordFailure,
    changePasswordSuccess,
} from '../actions';
import { ResourseStatus } from '../constants';

const initialState = fromJS({
    status: ResourseStatus.LOADING,
    data: fromJS({
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        role: undefined,
    }),
    error: undefined,
});

export const userReducer = handleActions(
    {
        [combineActions(signInSuccess, signUpSuccess)]: (
            state,
            { payload: { user } }
        ) =>
            state
                .updateIn(['status'], () => ResourseStatus.READY)
                .updateIn(['data'], data => ({ ...data, ...user }))
                .updateIn(['error'], () => undefined),

        CHANGE_USER_ROLE_SUCCESS: (state, { payload: { role } }) =>
            state
                .updateIn(['status'], () => ResourseStatus.READY)
                .updateIn(['data', 'role'], () => role)
                .updateIn(['error'], () => undefined),

        [combineActions(changePasswordSuccess, changePasswordFailure)]: state =>
            state.updateIn(['status'], () => ResourseStatus.READY),

        [combineActions(signInFailure, signUpFailure, changeUserRoleFailure)]: (
            state,
            { payload: { error } }
        ) =>
            state
                .updateIn(['status'], () => ResourseStatus.ERROR)
                .updateIn(['error'], () => error),

        [combineActions(
            signInStart,
            signUpStart,
            changeUserRoleStart,
            changePasswordStart
        )]: state => state.updateIn(['status'], () => ResourseStatus.LOADING),

        SIGN_OUT_SUCCESS: () =>
            initialState.updateIn(['status'], () => ResourseStatus.READY),
    },
    initialState
);
