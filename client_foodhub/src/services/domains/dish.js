export default class DishService {
    getDishes = restaurantId =>
        new Promise((resolve, reject) => {
            try {
                setTimeout(() =>
                    resolve([
                        {
                            id: 0,
                            title: 'Биг Мак',
                            description: 'Биг Мак это большой бургер Мак',
                            price: 55,
                            image: 'https://nashagazeta.ch/sites/default/files/styles/article/public/bur-bigmac-big_0_0.jpg?itok=ulBsdGfr',
                        },
                        {
                            id: 1,
                            title: 'Чизбургер',
                            description: 'Чизбургер это бургер с СЫРОМ',
                            price: 35,
                            image: 'https://irecommend.ru/sites/default/files/product-images/10297/AicNGqZUXD6gQsn3iYF1Q.jpg',
                        },
                        {
                            id: 2,
                            title: 'Биг Тейсти',
                            description: 'Биг Тейсти это Большой и Вкусный бургер',
                            price: 65,
                            image: 'http://m-delivery.com/wa-data/public/shop/products/03/00/3/images/2/2.750.png',
                        },
                        {
                            id: 3,
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
