export class FakeUserApiService {
    constructor(auth) {
        this.auth = auth;
    }

    postUser = user =>
        new Promise((resolve, reject) => {
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

    getUser = () =>
        new Promise((resolve, reject) => {
            try {
                const {
                    user: { login, password, ...user },
                } = JSON.parse(localStorage.getItem('food-hub-client'));
                if (user) {
                    setTimeout(() => resolve(user), 500);
                } else {
                    setTimeout(() => reject(new Error('Invalid token')), 500);
                }
            } catch (error) {
                setTimeout(() => reject(error), 500);
            }
        });

    login = (userLogin, userPassword) =>
        new Promise((resolve, reject) => {
            try {
                const {
                    user: { email, password, ...user },
                } = JSON.parse(localStorage.getItem('food-hub-client'));
                if (email === userLogin && password === userPassword && user) {
                    const token = new Date().toISOString();
                    const { error } = this.auth.writeToken(token);
                    if (error) throw error;

                    setTimeout(() => resolve({ ...user, email }), 500);
                } else {
                    setTimeout(() => reject(new Error('Invalid credentials')), 500);
                }
            } catch (error) {
                setTimeout(() => reject(error), 500);
            }
        });

    createRestaurant = restaurant =>
        new Promise((resolve, reject) => {
            try {
                const data = JSON.parse(localStorage.getItem('food-hub-client'));
                const { restaurants } = data;
                localStorage.setItem(
                    'food-hub-client',
                    JSON.stringify({ ...data, restaurants: { ...restaurants, restaurant } })
                );
                setTimeout(() => resolve(restaurant), 500);
            } catch (error) {
                setTimeout(() => reject(error), 500);
            }
        });

    getRestaurants = () =>
        new Promise((resolve, reject) => {
            try {
                const restaurants = [
                    {
                        id: 1,
                        image:
                            'https://delo.ua/files/news/images/3535/14/picture2_mcdonalds-otkryla_353514_p0.jpg',
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
        });

    getLocations = () =>
        new Promise((resolve, reject) => {
            try {
                setTimeout(
                    () =>
                        resolve(['КПИ', 'м. Вокзальная', 'м. Университет', 'м. Театральная', 'НАУ', 'Шулявка']),
                    500
                );
            } catch (error) {
                setTimeout(() => reject(error), 500);
            }
        });

    getDishes = restaurantId =>
        new Promise((resolve, reject) => {
            try {
                setTimeout(() =>
                    resolve([
                        {
                            title: 'Биг Мак',
                            description: 'Биг Мак это большой бургер Мак',
                            price: 55,
                            image: 'https://nashagazeta.ch/sites/default/files/styles/article/public/bur-bigmac-big_0_0.jpg?itok=ulBsdGfr',
                        },
                        {
                            title: 'Чизбургер',
                            description: 'Чизбургер это бургер с СЫРОМ',
                            price: 35,
                            image: 'https://irecommend.ru/sites/default/files/product-images/10297/AicNGqZUXD6gQsn3iYF1Q.jpg',
                        },
                        {
                            title: 'Биг Тейсти',
                            description: 'Биг Тейсти это Большой и Вкусный бургер',
                            price: 65,
                            image: 'http://m-delivery.com/wa-data/public/shop/products/03/00/3/images/2/2.750.png',
                        },
                        {
                            title: 'Картошка Фри это жаренная картошка',
                            description: 'Картошка Фри это жаренная картошка',
                            price: 25,
                            image: 'https://static.1000.menu/img/content/11993/kartofel-fri-v-multivarke_1418731085_2_max.jpg',
                        },
                    ])
                );
            } catch (error) {
                setTimeout(() => reject(error), 500);
            }
        });
}
