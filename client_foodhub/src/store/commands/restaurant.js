import {
    createRestaurantStart,
    createRestaurantSuccess,
    createRestaurantFail,

    getRestaurantsStart,
    getRestaurantsSuccess,
    getRestaurantsFail,

    getLocationsStart,
    getLocationsSuccess,
    getLocationsFail,

} from '../actions';

export const createRestaurant = ( restaurant ) => async (dispatch, _getState, { api }) => {
    dispatch(createRestaurantStart());
    try {
        const response = await api.createRestaurant(restaurant);
        dispatch(createRestaurantSuccess(response));
    } catch (error) {
        dispatch(createRestaurantFail(error));
    }
}

export const getRestaurants = () => async (dispatch, _getState, { api }) => {
    dispatch(getRestaurantsStart());
    try {
        const restaurants = await api.getRestaurants();
        dispatch(getRestaurantsSuccess(restaurants));
    } catch (error) {
        dispatch(getRestaurantsFail(error))
    }
}

export const getLocations = () => async (dispatch, _getState, { api }) => {
    dispatch(getLocationsStart());
    try {
        const locations = await api.getLocations();
        dispatch(getLocationsSuccess(locations));
    } catch (error) {
        dispatch(getLocationsFail(error));
    }
}
