import { createActions } from 'redux-actions';

export const { getDishesStart, getDishesSuccess, getDishesFail, selectDish, removeSelectedDishById, removeAllSelectedDishesById } = createActions({
    GET_DISHES_START: () => ({}),
    GET_DISHES_SUCCESS: dishes => ({ dishes }),
    GET_DISHES_ERROR: error => ({ error }),

    SELECT_DISH: (dishId, count) => ({ dishId, count }),
    REMOVE_SELECTED_DISH_BY_ID: (dishId) => ({ dishId }),
    REMOVE_ALL_SELECTED_DISHES_BY_ID: (dishId) => ({ dishId }),
});
