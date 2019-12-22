import { createSelector } from 'reselect';

import { ResourseStatus } from '../constants';

import { ErrorType } from '../../utils';

export const selectUserState = state => state.user;

export const selectUserData = createSelector(
    selectUserState,
    user => user.get && user.get('data')
);

export const selectUserRole = createSelector(
    selectUserData,
    data => data.get && data.get('role')
);

export const selectIsUserProducer = createSelector(
    selectUserRole,
    role => role === 'producer'
);

export const selectIsAuthenticated = createSelector(
    selectUserState,
    user =>
        user.get('status') === ResourseStatus.READY &&
        user.getIn(['data', 'email'])
);

export const selectIsUserDataLoading = createSelector(
    selectUserState,
    user => user.get('status') === ResourseStatus.LOADING
);

export const selectIsUserErrorExist = createSelector(selectUserState, user =>
    Boolean(user.getIn(['error', 'type']))
);

export const selectUserDataErrorMessage = createSelector(
    selectUserState,
    selectIsUserErrorExist,
    (user, isError) => {
        if (!isError) return;
        const errorType = user.getIn(['error', 'type']);
        switch (errorType) {
            case ErrorType.SIGN_IN_INVALID_CREDENTIALS:
                return 'Incorrect email or password. Please, try again.';
            case ErrorType.SESSION_EXPIRED:
                return 'Session expired. Please try to sign in again.';
            case ErrorType.SIGN_IN_UNKNOWN_USER:
                return 'User with provided email does not exist. Please, try to sign in using another email.';
            case ErrorType.SIGN_UP_INVALID_EMAIL:
                return 'Format of provided email is invalid. Please, enter valid email.';
            case ErrorType.SIGN_UP_DUPLICATED_EMAIL:
                return 'User with provided email already exists. Please, try to sign in or use another email.';
            default:
                return 'Error. Please, try again.';
        }
    }
);
