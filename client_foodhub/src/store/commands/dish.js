import {
    getDishesStart,
    getDishesSuccess,
    getDishesFail,
} from '../actions';

export const getDishes = restaurantId => async (dispatch, _getState, { api }) => {
    dispatch(getDishesStart());
    try {
        const dishes = await api.getDishes(restaurantId);
        dispatch(getDishesSuccess(dishes));
    } catch(error) {
        dispatch(getDishesFail(error));
    }
}
