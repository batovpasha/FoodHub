import { createSelector } from 'reselect';
import { ResourseStatus } from '../constants';

export const selectRestaurantState = state => state.restaurant;

export const selectAllRestaurants = createSelector(selectRestaurantState, restaurantStore =>
    restaurantStore.get('store')
);

export const selectAllLocations = createSelector(selectRestaurantState, restaurantStore =>
    restaurantStore.get('locations')
);

export const selectIsRestaurantsLoading = createSelector(selectRestaurantState, restaurantStore =>
    restaurantStore.get('status') === ResourseStatus.LOADING
);
