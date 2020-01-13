import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import { ResourseStatus } from '../constants';

import {
    sendOrderStart,
    sendOrderFinish,
    getOrdersByCustomerStart,
    getOrdersByCustomerSuccess,
    getOrdersByCustomerFail,
    getOrdersByProducerStart,
    getOrdersByProducerSuccess,
    getOrdersByProducerFail,
} from '../actions';

const initialState = fromJS({
    status: ResourseStatus.READY,
    ordersByCustomer: {
        status: ResourseStatus.READY,
        data: [],
    },
    ordersByProducer: {
        status: ResourseStatus.READY,
        data: [],
    },
});

export const orderReducer = handleActions(
    {
        [sendOrderStart]: state => state.set('status', ResourseStatus.LOADING),
        [sendOrderFinish]: state => state.set('status', ResourseStatus.READY),

        [getOrdersByCustomerStart]: state =>
            state.setIn(['ordersByCustomer', 'status'], ResourseStatus.LOADING),
        [getOrdersByCustomerSuccess]: (state, { payload: { orders } }) =>
            state
                .setIn(['ordersByCustomer', 'status'], ResourseStatus.READY)
                .setIn(['ordersByCustomer', 'data'], orders),
        [getOrdersByCustomerFail]: state =>
            state.setIn(['ordersByCustomer', 'status'], ResourseStatus.ERROR),

        [getOrdersByProducerStart]: state =>
            state.setIn(['ordersByProducer', 'status'], ResourseStatus.LOADING),
        [getOrdersByProducerSuccess]: (state, { payload: { orders } }) =>
            state
                .setIn(['ordersByProducer', 'status'], ResourseStatus.READY)
                .setIn(['ordersByProducer', 'data'], orders),
        [getOrdersByProducerFail]: state =>
            state.setIn(['ordersByProducer', 'status'], ResourseStatus.ERROR),
    },
    initialState
);
