import FetchFactory from '../fetch';

export default class OrderService {
    fetch = FetchFactory(`${process.env.REACT_APP_ORDER_API_BASE_URL}/order`);

    sendOrder = async data => {
        const response = await this.fetch.post('/add', data);
        if (!response.ok) {
            return this.handleInvalidResponse(response);
        }
    }

    getOrdersByCustomer = async () => {
        const response = await this.fetch.get('/list/customer');
        if (!response.ok) {
            return this.handleInvalidResponse(response);
        }
        const data = await response.json();
        return data;
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
