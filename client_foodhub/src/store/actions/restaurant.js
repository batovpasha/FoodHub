import { createActions } from 'redux-actions';

export const { getLocationsStart, getLocationsSuccess, getLocationsFail } = createActions({
    GET_LOCATIONS_START: () => ({}),
    GET_LOCATIONS_SUCCESS: locations => ({ locations }),
    GET_LOCATIONS_FAIL: error => ({ error }),
});

export const { createRestaurantStart, createRestaurantSuccess, createRestaurantFail } = createActions({
    CREATE_RESTAURANT_START: () => ({}),
    CREATE_RESTAURANT_SUCCESS: restaurant => ({ restaurant }),
    CREATE_RESTAURANT_FAIL: error => ({ error }),
});

export const { deleteRestaurantStart, deleteRestaurantSuccess, deleteRestaurantFail } = createActions({
    DELETE_RESTAURANT_START: id => ({ id }),
    DELETE_RESTAURANT_SUCCESS: () => ({}),
    DELETE_RESTAURANT_FAIL: error => ({ error }),
})

export const { updateRestaurantStart, updateRestaurantSuccess, updateRestaurantFail } = createActions({
    UPDATE_RESTAURANT_START: (id, data) => ({ id, data }),
    UPDATE_RESTAURANT_SUCCESS: data => ({ data }),
    UPDATE_RESTAURANT_FAIL: error => ({ error }),
})

export const { getRestaurantStart, getRestaurantSuccess, getRestaurantFail } = createActions({
    GET_RESTAURANT_START: id => ({ id }),
    GET_RESTAURANT_SUCCESS: restaurant => ({ restaurant }),
    GET_RESTAURANT_FAIL: error => ({ error }),
})

export const { getRestaurantsStart, getRestaurantsSuccess, getRestaurantsFail } = createActions({
    GET_RESTAURANTS_START: () => ({}),
    GET_RESTAURANTS_SUCCESS: restaurants => ({ restaurants }),
    GET_RESTAURANTS_FAIL: error => ({ error }),
})
