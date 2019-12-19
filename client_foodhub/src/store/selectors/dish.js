import { createSelector } from 'reselect';
import { ResourseStatus } from '../constants';

export const selectDishesState = state => state.dish;

export const selectAllDishes = createSelector(selectDishesState, dishesStore =>
    dishesStore.get('store')
);

export const selectAllSelectedDishes = createSelector(selectDishesState, dishesStore =>
    dishesStore.get('selected')
);

export const selectIsDishesLoading = createSelector(selectDishesState, dishesStore =>
    dishesStore.get('status') === ResourseStatus.LOADING
);
