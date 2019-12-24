import { createSelector } from 'reselect';
import { ResourseStatus } from '../constants';

export const selectPlaceState = state => state.place;

export const selectPlaceStatus = createSelector(selectPlaceState, placeState =>
    placeState.getIn(['status'])
);

export const selectIsPlacesLoading = createSelector(
    selectPlaceStatus,
    status => status === ResourseStatus.LOADING
);
