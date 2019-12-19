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
            const restaurants = [
                {
                    id: 1,
                    image: 'https://delo.ua/files/news/images/3535/14/picture2_mcdonalds-otkryla_353514_p0.jpg',
                    title: 'McDonalds',
                    description: 'Я це люблю',
                    rating: 4,
                    distance: 4.3,
                },
                {
                    id: 2,
                    image:
                        'https://www.incimages.com/uploaded_files/image/970x450/getty_609504538_2000132920009280129_400506.jpg',
                    title: 'KFC',
                    description: 'Лучшие крылышки',
                    rating: 5,
                    distance: 1.3,
                },
                {
                    id: 3,
                    image: 'http://franch.ua/wp-content/uploads/2019/07/franshiza-sushi-wok-ua.jpg',
                    title: 'SushiWok',
                    description: 'Роллы по доступной цене',
                    rating: 3,
                    distance: 0.8,
                },
                {
                    id: 4,
                    image: 'https://media-cdn.tripadvisor.com/media/photo-s/04/a3/84/85/melrose.jpg',
                    title: 'Melrose',
                    description: 'Атмосфера дикого запада',
                    rating: 5,
                    distance: 2.2,
                },
                {
                    id: 5,
                    image: 'https://media-cdn.tripadvisor.com/media/photo-s/11/3a/01/c7/caption.jpg',
                    title: 'Пузата Хата',
                    description: 'ТОП за свои деньги',
                    rating: 5,
                    distance: 0.3,
                },
            ];
            setTimeout(() => resolve(restaurants), 500);
        } catch (error) {
            setTimeout(() => reject(error), 500);
        }
    })

    getLocations = () => new Promise(( resolve, reject ) => {
        try {
            setTimeout(
                () => resolve(['КПИ', 'м. Вокзальная', 'м. Университет', 'м. Театральная', 'НАУ', 'Шулявка']),
                500
            );
        } catch (error) {
            setTimeout(() => reject(error), 500);
        }
    })
}
