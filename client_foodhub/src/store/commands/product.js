import {
    getDishesStart,
    getDishesSuccess,
    getDishesFail,
    addProductStart,
    addProductFinish,
    deleteProductStart,
    deleteProductFinish,
} from '../actions';

import { showNotification } from './notifications';
import {
    NotificationTypes,
    getErrorTypeByError,
    getErrorMessageByType,
} from '../../utils';

export const getProducts = () => async (dispatch, _getState, { placeAPI }) => {
    dispatch(getDishesStart());
    try {
        const rawPlaces = await placeAPI.getProducts();
        const places = rawPlaces.map(place => ({
            ...place,
            title: place.product_name,
        }));
        dispatch(getDishesSuccess(places));
    } catch (error) {
        dispatch(getDishesFail(error));
    }
};

export const addProduct = (data, redirect) => async (
    dispatch,
    _getState,
    { placeAPI }
) => {
    dispatch(addProductStart());
    try {
        await placeAPI.addProduct(data);
        dispatch(
            showNotification(
                NotificationTypes.SUCCESS,
                'Product was successufuly added!'
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
    dispatch(addProductFinish());
};

export const deleteProduct = id => async (
    dispatch,
    _getState,
    { placeAPI }
) => {
    dispatch(deleteProductStart());
    try {
        await placeAPI.deleteProduct(id);
        dispatch(getProducts());
        dispatch(
            showNotification(
                NotificationTypes.SUCCESS,
                'Product was successufuly deleted!'
            )
        );
    } catch (error) {
        dispatch(deleteProductFinish());
        dispatch(
            showNotification(
                NotificationTypes.ERROR,
                getErrorMessageByType(getErrorTypeByError(error))
            )
        );
    }
};
