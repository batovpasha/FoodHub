import FetchFactory from '../fetch';

export default class PlaceService {
    fetch = FetchFactory(`${process.env.REACT_APP_PLACE_API_BASE_URL}/place`);

    addPlace = async data => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        const response = await this.fetch.postForm('/add', formData);
        if (!response.ok) {
            return this.handleInvalidResponse(response);
        }
    };

    getPlaces = async () => {
        const response = await this.fetch.get('/product/list');
        const places = await response.json();
        return places;
    }

    handleInvalidResponse = async response => {
        const payload = await response.json();
        if (payload && payload.error) {
            throw new Error(payload.error);
        } else {
            throw new Error('Invalid response!');
        }
    };
}
