import {
    getDishesStart,
    getDishesSuccess,
    getDishesFail,
} from '../actions';

export const getDishes = restaurantId => async (dispatch, _getState, { dishAPI }) => {
    dispatch(getDishesStart());
    try {
        const dishes = await dishAPI.getDishes(restaurantId);
        dispatch(getDishesSuccess(dishes));
    } catch(error) {
        dispatch(getDishesFail(error));
    }
}
