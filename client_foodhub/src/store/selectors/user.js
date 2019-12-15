import { createSelector } from 'reselect';

import { ResourseStatus } from '../constants';

export const selectUserState = state => state.user;

export const selectIsAuthenticated = createSelector(
    selectUserState,
    user => user.get('status') === ResourseStatus.READY && Boolean(user.get('data'))
);
