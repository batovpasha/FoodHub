import { createSelector } from 'reselect';
import { ResourseStatus } from '../constants';
import { selectUserId } from './user';

export const selectPlaceState = state => state.place;

export const selectPlaceStatus = createSelector(selectPlaceState, placeState =>
    placeState.getIn(['status'])
);

export const selectIsPlacesLoading = createSelector(
    selectPlaceStatus,
    status => status === ResourseStatus.LOADING
);

export const selectPlaces = createSelector(selectPlaceState, placeState =>
    placeState.getIn(['list'])
);

export const selectProducerPlaces = createSelector(
    selectPlaces,
    selectUserId,
    (places, userId) =>
        places ? places.filter(place => place['owner_id'] === userId) : []
);
