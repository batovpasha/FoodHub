import { createSelector } from 'reselect';

export const selectDishesState = state => state.dish;

export const selectAllDishes = createSelector(selectDishesState, dishesStore =>
    dishesStore.get('store')
);

export const selectAllSelectedDishes = createSelector(selectDishesState, dishesStore =>
    dishesStore.get('selected')
)
