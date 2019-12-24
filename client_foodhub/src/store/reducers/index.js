import { combineReducers } from 'redux';

import { userReducer } from './user';
import { restaurantReducer } from './restaurant';
import { dishReducer } from './dish';
import { notificationsReducer } from './notifications';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
    user: userReducer,
    restaurant: restaurantReducer,
    dish: dishReducer,
    notifications: notificationsReducer,
});
