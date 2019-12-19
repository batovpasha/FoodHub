import {combineReducers} from 'redux';

import { userReducer } from './user';
import { restaurantReducer } from './restaurant';
import { dishReducer } from './dish';

export const rootReducer = combineReducers({
    user: userReducer,
    restaurant: restaurantReducer,
    dish: dishReducer,
});
