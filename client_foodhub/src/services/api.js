export default class ApiService {
    constructor(auth, user, restaurant, dish) {
        this.auth = auth;
        this.user = user;
        this.restaurant = restaurant;
        this.dish = dish;
    }

    // user endpoints
    postUser = user => this.user.postUser(this.auth, user);
    getUser = () => this.user.getUser();
    login = (userLogin, userPassword) => this.user.login(this.auth, userLogin, userPassword);

    // restaurant endpoints
    createRestaurant = restaurant => this.restaurant.createRestaurant(restaurant);
    getRestaurants = () => this.restaurant.getRestaurants();
    getLocations = () => this.restaurant.getLocations();

    // dish endpoints
    getDishes = restaurantId => this.dish.getDishes(restaurantId);
}
