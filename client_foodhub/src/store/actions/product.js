import { createActions } from 'redux-actions';

export const { addPlaceStart, addPlaceFinish } = createActions({
    ADD_PLACE_START: () => ({}),
    ADD_PLACE_FINISH: () => ({}),
});

export const { deletePlaceStart, deletePlaceFinish } = createActions({
    DELETE_PLACE_START: () => ({}),
    DELETE_PLACE_FINISH: () => ({}),
});

export const {
    fetchPlacesStart,
    fetchPlacesSuccess,
    fetchPlacesFailure,
} = createActions({
    FETCH_PLACES_START: () => ({}),
    FETCH_PLACES_SUCCESS: places => ({ places }),
    FETCH_PLACES_FAILURE: error => ({ error }),
});
