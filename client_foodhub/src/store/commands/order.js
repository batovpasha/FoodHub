import {
    sendOrderStart,
    sendOrderSuccess,
    sendOrderFail,
} from '../actions';

export const sendOrder = data => async (dispatch, _getState, { dishAPI }) => {
    // dispatch(getDishesStart());
    // try {
    //     const dishes = await dishAPI.getDishes(restaurantId);
    //     dispatch(getDishesSuccess(dishes));
    // } catch(error) {
    //     dispatch(getDishesFail(error));
    // }
}

