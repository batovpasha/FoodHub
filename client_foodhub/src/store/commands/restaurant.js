import {
    createRestaurant,
    createRestaurantSuccess,
    createRestaurantFail,

    getRestaurants,
    getRestaurantsSuccess,
    getRestaurantsFail,
} from '../actions';

export const createRestaurant = ( restaurant ) => async (dispatch, _getState, { api }) => {
    dispatch(createRestaurant());
    try {
        const response = await api.createRestaurant(restaurant);
        dispatch(createRestaurantSuccess(response));
    } catch (error) {
        dispatch(createRestaurantFail(error));
    }
}

export const getRestaurants = () => async (dispatch, _getState, { api }) => {
    dispatch(getRestaurants());

    try {
        const restaurants = await api.getRestaurants();
        dispatch(getRestaurantsSuccess(restaurants));
    } catch (error) {
        dispatch(getRestaurantsFail(error))
    }
}
