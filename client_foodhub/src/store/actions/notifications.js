import { createActions } from 'redux-actions';

export const { addNotification, removeNotification } = createActions({
    ADD_NOTIFICATION: notification => ({ notification }),
    REMOVE_NOTIFICATION: id => ({ id }),
});
