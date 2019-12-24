import {
    getDishesStart,
    getDishesSuccess,
    getDishesFail,
} from '../actions';

export const getDishes = () => async (dispatch, _getState, { placeAPI }) => {
    dispatch(getDishesStart());
    try {
        const rawPlaces = await placeAPI.getPlaces();
        const places = rawPlaces.map(place => ({ ...place, title: place.product_name }));
        dispatch(getDishesSuccess(places));
    } catch(error) {
        dispatch(getDishesFail(error));
    }
}

