import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

// import {

// } from '../actions';

const initialState = fromJS({
    store: [
        {
            id: 1,
            image: 'https://delo.ua/files/news/images/3535/14/picture2_mcdonalds-otkryla_353514_p0.jpg',
            title: 'McDonalds',
            description: 'Я це люблю',
            rating: 4,
            distance: 4.3
        },
        {
            id: 2,
            image: 'https://www.incimages.com/uploaded_files/image/970x450/getty_609504538_2000132920009280129_400506.jpg',
            title: 'KFC',
            description: 'Лучшие крылышки',
            rating: 5,
            distance: 1.3
        },
        {
            id: 3,
            image: 'http://franch.ua/wp-content/uploads/2019/07/franshiza-sushi-wok-ua.jpg',
            title: 'SushiWok',
            description: 'Роллы по доступной цене',
            rating: 3,
            distance: 0.8
        },
        {
            id: 4,
            image: 'https://media-cdn.tripadvisor.com/media/photo-s/04/a3/84/85/melrose.jpg',
            title: 'Melrose',
            description: 'Атмосфера дикого запада',
            rating: 5,
            distance: 2.2
        },
        {
            id: 5,
            image: 'https://media-cdn.tripadvisor.com/media/photo-s/11/3a/01/c7/caption.jpg',
            title: 'Пузата Хата',
            description: 'ТОП за свои деньги',
            rating: 5,
            distance: 0.3
        }
    ],
});

export const restaurantReducer = handleActions({},
    initialState
);

