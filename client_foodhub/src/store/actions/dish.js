import { createActions } from 'redux-actions';

export const { getDishesStart, getDishesSuccess, getDishesFail } = createActions({
    GET_DISHES_START: () => ({}),
    GET_DISHES_SUCCESS: dishes => ({ dishes }),
    GET_DISHES_ERROR: error => ({ error }),
});
