import { createSelector } from 'reselect';

export const selectRestaurantState = state => state.restaurant;

export const selectAllRestaurants = createSelector(selectRestaurantState, restaurantStore =>
    restaurantStore.get('store')
);

export const selectAllLocations = createSelector(selectRestaurantState, restaurantStore =>
    restaurantStore.get('locations')
)
