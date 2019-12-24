import {
    sendOrderStart,
    sendOrderFinish,
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

