import { createSelector } from 'reselect';

import { ResourseStatus } from '../constants';

import { getErrorMessageByType } from '../../utils';

export const selectUserState = state => state.user;

export const selectUserData = createSelector(
    selectUserState,
    user => user.toJS().data
);

export const selectUserRole = createSelector(selectUserState, user =>
    user.getIn(['data', 'role'])
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
        return getErrorMessageByType(errorType);
    }
);
