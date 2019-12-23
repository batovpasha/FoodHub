import { List } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = new List();

export const notificationsReducer = handleActions(
    {
        ADD_NOTIFICATION: (state, { payload: { notification } }) =>
            state.push(notification),

        REMOVE_NOTIFICATION: (state, { payload: { id: deleteId } }) =>
            state.filter(({ id }) => id !== deleteId),
    },
    initialState
);
