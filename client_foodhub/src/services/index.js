// export * from './api';
// export * from './user';
// export * from './auth';
import ApiService from './api';
import UserService from './user';
import AuthService from './auth';
import RestaurantService from './restaurant';
import DishService from './dish';

export const api = new ApiService(
    new AuthService(),
    new UserService(),
    new RestaurantService(),
    new DishService(),
)
