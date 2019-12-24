import {
    sendOrderStart,
    sendOrderFinish,

    getOrdersByCustomerStart,
    getOrdersByCustomerSuccess,
    getOrdersByCustomerFail,
} from '../actions';

import { showNotification } from './notifications';
import {
    NotificationTypes,
    getErrorTypeByError,
    getErrorMessageByType,
} from '../../utils';

export const sendOrder = (data, redirect) => async (dispatch, _getState, { orderAPI }) => {
    dispatch(sendOrderStart());
    try {
        await orderAPI.sendOrder(data);
        dispatch(
            showNotification(
                NotificationTypes.SUCCESS,
                'Order was successufuly sent'
            )
        );
        redirect && redirect();
    } catch (error) {
        dispatch(
            showNotification(
                NotificationTypes.ERROR,
                getErrorMessageByType(getErrorTypeByError(error))
            )
        );
    }
    dispatch(sendOrderFinish());
}

export const getOrdersByCustomer = () => async (dispatch, _getState, { orderAPI }) => {
    dispatch(getOrdersByCustomerStart());
    try {
        const orders = await orderAPI.getOrdersByCustomer();
        dispatch(getOrdersByCustomerSuccess(orders));
    } catch (error) {
        dispatch(getOrdersByCustomerFail(error));
    }
}

