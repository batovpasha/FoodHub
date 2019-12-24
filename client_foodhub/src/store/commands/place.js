import {
    addPlaceStart,
    addPlaceFinish,
    fetchPlacesStart,
    fetchPlacesFailure,
    fetchPlacesSuccess,
    deletePlaceStart,
    deletePlaceFinish,
} from '../actions/place';
import { showNotification } from './notifications';
import {
    NotificationTypes,
    getErrorTypeByError,
    getErrorMessageByType,
} from '../../utils';

export const addPlace = (data, redirect) => async (
    dispatch,
    _getState,
    { placeAPI }
) => {
    dispatch(addPlaceStart());
    try {
        await placeAPI.addPlace(data);
        dispatch(
            showNotification(
                NotificationTypes.SUCCESS,
                'Place was successufuly added!'
            )
        );
        redirect && redirect();
    } catch (error) {
        dispatch(
            showNotification(
                NotificationTypes.ERROR,
                getErrorMessageByType(getErrorTypeByError(error))
            )
        );
    }
    dispatch(addPlaceFinish());
};

export const fetchPlaces = () => async (dispatch, _getState, { placeAPI }) => {
    dispatch(fetchPlacesStart());
    try {
        const places = await placeAPI.fetchPlaces();
        dispatch(fetchPlacesSuccess(places));
    } catch (error) {
        dispatch(fetchPlacesFailure({ type: getErrorTypeByError(error) }));
    }
};

export const deletePlace = id => async (dispatch, _getState, { placeAPI }) => {
    dispatch(deletePlaceStart());
    try {
        await placeAPI.deletePlace(id);
        dispatch(fetchPlaces());
        dispatch(
            showNotification(
                NotificationTypes.SUCCESS,
                'Place was successufuly deleted!'
            )
        );
    } catch (error) {
        dispatch(deletePlaceFinish());
        dispatch(
            showNotification(
                NotificationTypes.ERROR,
                getErrorMessageByType(getErrorTypeByError(error))
            )
        );
    }
};
