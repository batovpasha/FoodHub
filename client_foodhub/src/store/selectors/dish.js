import { createSelector } from 'reselect';
import { ResourseStatus } from '../constants';
import { List, Map } from 'immutable';
import { selectProducerPlaces } from './place';

export const selectDishesState = state => state.dish;

const getAllDishes = store => store.get('store');

export const selectAllDishes = createSelector(selectDishesState, getAllDishes);

export const selectIsDishesLoading = createSelector(
    selectDishesState,
    dishesStore => dishesStore.get('status') === ResourseStatus.LOADING
);

export const getAllSelectedInfo = store =>
    store.get('selected').filter(value => value.get('status'));

export const selectPickedDishes = createSelector(
    selectDishesState,
    dishesStore => {
        const dishes = getAllDishes(dishesStore);

        let result = List();

        getAllSelectedInfo(dishesStore).forEach((value, key) => {
            const count = value.get('count');
            const dish = dishes.find(dish => dish.id === Number(key));
            result = result.push(Map({ ...dish, count }));
        });

        return result;
    }
);

export const selectDishesByPlace = createSelector(
    selectProducerPlaces,
    selectAllDishes,
    (places, dishes) =>
        places.map(place =>
            Map({
                place,
                dishes: dishes.filter(dish => dish['place_id'] === place.id),
            })
        )
);
