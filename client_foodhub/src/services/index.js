import Auth from './auth';

import UserService from './domains/user';
import RestaurantService from './domains/restaurant';
import DishService from './domains/dish';

export function configureServices () {
    return {
        userAPI: new UserService(),
        restaurantAPI: new RestaurantService(),
        dishAPI: new DishService()
    };
};

export function preloadUserData (userAPI) {
    return new Promise((resolve, reject) => {
        if (Auth.token) {
            userAPI
                .loadUser()
                .then(resolve)
                .catch(reject);
        } else {
            reject();
        }
    })
};
