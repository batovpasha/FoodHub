export class FakeUserApiService {
    constructor(auth) {
        this.auth = auth;
    }

    postUser = user => new Promise((resolve, reject) => {
        try {
            const token = new Date().toISOString();
            const { error } = this.auth.writeToken(token);
            if (error) throw error;

            const data = JSON.parse(localStorage.getItem('food-hub-client'));
            localStorage.setItem('food-hub-client', JSON.stringify({ ...data, user }));

            setTimeout(() => resolve(user), 500);
        } catch (error) {
            setTimeout(() => reject(error), 500);
        }
    });

    getUser = () => new Promise((resolve, reject) => {
        try {
            const { user: { login, password, ...user } } = JSON.parse(
                localStorage.getItem('food-hub-client')
            );
            if (user) {
                setTimeout(() => resolve(user), 500);
            } else {
                setTimeout(() => reject(new Error('Invalid token')), 500);
            }
        } catch (error) {
            setTimeout(() => reject(error), 500);
        }
    });

    login = (userLogin, userPassword) => new Promise((resolve, reject) => {
        try {
            const { user: { email, password, ...user } } = JSON.parse(
                localStorage.getItem('food-hub-client')
            );
            if (email === userLogin && password === userPassword && user) {
                const token = new Date().toISOString();
                const { error } = this.auth.writeToken(token);
                if (error) throw error;

                setTimeout(() => resolve({...user, email}), 500);
            } else {
                setTimeout(() => reject(new Error('Invalid credentials')), 500);
            }
        } catch (error) {
            setTimeout(() => reject(error), 500);
        }
    });

    createRestaurant = restaurant => new Promise(( resolve, reject ) => {
        try {
            const data = JSON.parse(localStorage.getItem('food-hub-client'));
            const { restaurants } = data;
            localStorage.setItem('food-hub-client', JSON.stringify({ ...data, restaurants: { ...restaurants, restaurant } }));
            setTimeout(() => resolve(restaurant), 500);
        } catch(error) {
            setTimeout(() => reject(error), 500);
        }
    })

    getRestaurants = () => new Promise(( resolve, reject ) => {
        try {
            const { restaurants } = JSON.parse(localStorage.getItem('food-hub-client'));

            if (restaurants) {
                setTimeout(() => resolve(restaurants), 500);
            } else {
                setTimeout(() => reject(new Error('No restaurants')), 500);
            }
        } catch (error) {
            setTimeout(() => reject(error), 500);
        }
    })
}
