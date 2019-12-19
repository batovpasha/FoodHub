import UserService from './domains/user';
import RestaurantService from './domains/restaurant';
import DishService from './domains/dish';

export default function configureServices () {
    return {
        userAPI: new UserService(),
        restaurantAPI: new RestaurantService(),
        dishAPI: new DishService()
    };
};
