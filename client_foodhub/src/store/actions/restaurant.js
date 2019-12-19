import { createActions } from 'redux-actions';

export const { createRestaurant, createRestaurantSuccess, createRestaurantFail } = createActions({
    CREATE_RESTAURANT: () => ({}),
    CREATE_RESTAURANT_SUCCESS: restaurant => ({ restaurant }),
    CREATE_RESTAURANT_FAIL: error => ({ error }),
});

export const { deleteRestaurant, deleteRestaurantSuccess, deleteRestaurantFail } = createActions({
    DELETE_RESTAURANT: id => ({ id }),
    DELETE_RESTAURANT_SUCCESS: () => ({}),
    DELETE_RESTAURANT_FAIL: error => ({ error }),
})

export const { updateRestaurant, updateRestaurantSuccess, updateRestaurantFail } = createActions({
    UPDATE_RESTAURANT: (id, data) => ({ id, data }),
    UPDATE_RESTAURANT_SUCCESS: data => ({ data }),
    UPDATE_RESTAURANT_FAIL: error => ({ error }),
})

export const { getRestaurant, getRestaurantSuccess, getRestaurantFail } = createActions({
    GET_RESTAURANT: id => ({ id }),
    GET_RESTAURANT_SUCCESS: restaurant => ({ restaurant }),
    GET_RESTAURANT_FAIL: error => ({ error }),
})

export const { getRestaurants, getRestaurantsSuccess, getRestaurantsFail } = createActions({
    GET_RESTAURANTS: () => ({}),
    GET_RESTAURANTS_SUCCESS: restaurants => ({ restaurants }),
    GET_RESTAURANTS_FAIL: error => ({ error }),
})
