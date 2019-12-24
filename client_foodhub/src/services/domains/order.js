import FetchFactory from '../fetch';

export default class OrderService {
    fetch = FetchFactory(`${process.env.REACT_APP_ORDER_API_BASE_URL}/orders`);

    sendOrder = async data => {
        const response = await this.fetch('/add', data);
        if (!response.ok) {
            return this.handleInvalidResponse(response);
        }
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
