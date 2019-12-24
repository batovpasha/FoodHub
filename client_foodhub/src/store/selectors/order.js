import { createSelector } from 'reselect';
import { ResourseStatus } from '../constants';

export const selectOrderState = state => state.order;

export const selectIsCustomerOrdersLoading = createSelector(
    selectOrderState,
    orderStore => orderStore.getIn(['ordersByCustomer', 'status']) === ResourseStatus.LOADING
);

export const selectCustomerOrders = createSelector(
    selectOrderState,
    orderStore => {
        return orderStore.getIn(['ordersByCustomer', 'data'])
    }
)

