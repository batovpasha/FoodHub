import { createActions } from 'redux-actions';

export const { sendOrderStart, sendOrderFinish, getOrdersByCustomerStart, getOrdersByCustomerSuccess, getOrdersByCustomerFail} = createActions({
    SEND_ORDER_START: () => ({}),
    SEND_ORDER_FINISH: () => ({}),

    GET_ORDERS_BY_CUSTOMER_START: () => ({}),
    GET_ORDERS_BY_CUSTOMER_SUCCESS: (orders) => ({orders}),
    GET_ORDERS_BY_CUSTOMER_FAIL: (error) => ({error}),
});
