import uuid from 'uuid';
import { addNotification, removeNotification } from '../actions';

export const showNotification = (type, message) => async dispatch => {
    const notification = { id: uuid(), type, message };
    dispatch(addNotification(notification));
    setTimeout(() => {
        dispatch(removeNotification(notification.id));
    }, 6000);
};
