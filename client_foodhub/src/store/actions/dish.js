import { createActions } from 'redux-actions';

export const {
    getDishesStart,
    getDishesSuccess,
    getDishesFail,
    pickDish,
    removeDish,
    addProductStart,
    addProductFinish,
} = createActions({
    GET_DISHES_START: () => ({}),
    GET_DISHES_SUCCESS: dishes => ({ dishes }),
    GET_DISHES_ERROR: error => ({ error }),

    PICK_DISH: (dishId, count) => ({ dishId, count }),
    REMOVE_DISH: (dishId, count) => ({ dishId, count }),

    ADD_PRODUCT_START: () => ({}),
    ADD_PRODUCT_FINISH: () => ({}),
});
