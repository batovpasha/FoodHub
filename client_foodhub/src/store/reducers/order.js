import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
    sendOrderStart,
    sendOrderSuccess,
    sendOrderFail,
} from '../actions';

const initialState = fromJS({
    status: 'READY',
});

export const orderReducer = handleActions({
    [sendOrderStart]: state => state
        .set('status', 'SENDING'),
    [sendOrderSuccess]: state => state
        .set('status', 'SENT'),
    [sendOrderFail]: state => state
        .set('status', 'ERROR'),
}, initialState)



