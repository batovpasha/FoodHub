import { createSelector } from 'reselect';

import { ResourseStatus, ErrorType } from '../constants';

export const selectUserState = state => state.user;

export const selectIsAuthenticated = createSelector(
    selectUserState,
    user => user.get('status') === ResourseStatus.READY && user.getIn(['data', 'email'])
);

export const selectIsUserDataLoading = createSelector(
    selectUserState,
    user => user.get('status') === ResourseStatus.LOADING
);

export const selectIsUserErrorExist = createSelector(
    selectUserState,
    user => Boolean(user.getIn(['error', 'type']))
);

export const selectUserDataErrorMessage = createSelector(
    selectUserState,
    selectIsUserErrorExist,
    (user, isError) => {
        if (!isError) return;
        const errorType = user.getIn(['error', 'type']);
        switch (errorType) {
            case ErrorType.INCORRECT_CREDENTIALS:
                return 'Incorrect email or password. Please try again.';
            default:
                return 'Error. Please try again.'
        }
    }
);
