import { createSelector } from 'reselect';
import { ResourseStatus } from '../constants';

export const selectOrderState = state => state.order;

export const selectIsCustomerOrdersLoading = createSelector(
    selectOrderState,
    orderStore =>
        orderStore.getIn(['ordersByCustomer', 'status']) ===
        ResourseStatus.LOADING
);

export const selectCustomerOrders = createSelector(
    selectOrderState,
    orderStore => {
        return orderStore.getIn(['ordersByCustomer', 'data']);
    }
);

export const selectIsProducerOrdersLoading = createSelector(
    selectOrderState,
    orderStore =>
        orderStore.getIn(['ordersByProducer', 'status']) ===
        ResourseStatus.LOADING
);

export const selectProducerOrders = createSelector(
    selectOrderState,
    orderStore => {
        return orderStore.getIn(['ordersByProducer', 'data']);
    }
);
