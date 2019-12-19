import {combineReducers} from 'redux';

import { userReducer } from './user';
import { restaurantReducer } from './restaurant';

export const rootReducer = combineReducers({
    user: userReducer,
    restaurant: restaurantReducer,
});
