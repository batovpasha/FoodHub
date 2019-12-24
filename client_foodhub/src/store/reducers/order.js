import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import { ResourseStatus } from '../constants';

import {
    sendOrderStart,
    sendOrderFinish,

    getOrdersByCustomerStart,
    getOrdersByCustomerSuccess,
    getOrdersByCustomerFail,
} from '../actions';

const initialState = fromJS({
    status: ResourseStatus.READY,
    ordersByCustomer: {
        status: ResourseStatus.READY,
        data: [],
    },
});

export const orderReducer = handleActions({
    [sendOrderStart]: state => state
        .set('status', ResourseStatus.LOADING),
    [sendOrderFinish]: state => state
        .set('status', ResourseStatus.READY),

    [getOrdersByCustomerStart]: state => state
        .setIn(['ordersByCustomer', 'status'], ResourseStatus.LOADING),
    [getOrdersByCustomerSuccess]: (state, { payload : { orders } }) => state
        .setIn(['ordersByCustomer', 'status'], ResourseStatus.READY)
        .setIn(['ordersByCustomer', 'data'], orders),
    [getOrdersByCustomerFail]: state => state
        .setIn(['ordersByCustomer', 'status'], ResourseStatus.ERROR),

}, initialState)



