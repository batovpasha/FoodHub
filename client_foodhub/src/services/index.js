import Auth from './auth';

import UserService from './domains/user';
import RestaurantService from './domains/restaurant';
import DishService from './domains/dish';
import PlaceService from './domains/place';
import OrderService from './domains/order';

export function configureServices() {
    return {
        userAPI: new UserService(),
        restaurantAPI: new RestaurantService(),
        dishAPI: new DishService(),
        placeAPI: new PlaceService(),
        orderAPI: new OrderService(),
    };
}

export function preloadUserData(userAPI) {
    return new Promise((resolve, reject) => {
        if (Auth.token) {
            userAPI
                .loadUser()
                .then(resolve)
                .catch(reject);
        } else {
            reject();
        }
    });
}
