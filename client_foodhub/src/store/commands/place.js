import { addPlaceStart, addPlaceFinish } from '../actions/place';
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
        dispatch(addPlaceFinish());
        dispatch(
            showNotification(
                NotificationTypes.SUCCESS,
                'Place was successufuly added!'
            )
        );
        redirect && redirect();
    } catch (error) {
        dispatch(addPlaceFinish());
        dispatch(
            showNotification(
                NotificationTypes.ERROR,
                getErrorMessageByType(getErrorTypeByError(error))
            )
        );
    }
};
