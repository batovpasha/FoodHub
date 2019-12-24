import {
    getDishesStart,
    getDishesSuccess,
    getDishesFail,
} from '../actions';

export const getProducts = () => async (dispatch, _getState, { placeAPI }) => {
    dispatch(getDishesStart());
    try {
        const rawPlaces = await placeAPI.getProducts();
        const places = rawPlaces.map(place => ({ ...place, title: place.product_name }));
        dispatch(getDishesSuccess(places));
    } catch(error) {
        dispatch(getDishesFail(error));
    }
}

export const addProduct = (data) => async (dispatch, _getState, { placeAPI }) => {
    try {
        await placeAPI.addProduct(data);
    } catch (error) {
        console.error(error);
    }
}

