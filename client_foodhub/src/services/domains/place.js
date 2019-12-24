import FetchFactory from '../fetch';

export default class PlaceService {
    fetch = FetchFactory(`${process.env.REACT_APP_PLACE_API_BASE_URL}/place`);

    _createFormData = data => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        return formData;
    };

    addPlace = async data => {
        const formData = this._createFormData(data);
        const response = await this.fetch.postForm('/add', formData);
        if (!response.ok) {
            return this.handleInvalidResponse(response);
        }
    };

    fetchPlaces = async () => {
        const response = await this.fetch.get('/list');
        if (response.ok) {
            return response.json();
        } else {
            this.handleInvalidResponse(response);
        }
    };

    deletePlace = async id => {
        const response = await this.fetch.delete(`/delete?id=${id}`);
        if (!response.ok) {
            this.handleInvalidResponse(response);
        }
    };

    addProduct = async data => {
        const formData = this._createFormData(data);
        const response = await this.fetch.postForm('/product/add', formData);
        if (!response.ok) {
            return this.handleInvalidResponse(response);
        }
    };

    getProducts = async () => {
        const response = await this.fetch.get('/product/list');
        const products = await response.json();
        return products;
    };

    handleInvalidResponse = async response => {
        const payload = await response.json();
        if (payload && payload.error) {
            throw new Error(payload.error);
        } else {
            throw new Error('Invalid response!');
        }
    };
}
