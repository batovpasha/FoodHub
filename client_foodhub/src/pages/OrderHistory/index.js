import React, { useEffect } from 'react';
import {
    getOrdersByCustomer,
    selectCustomerOrders,
    selectIsCustomerOrdersLoading,
} from '../../store';
import Loading from '../../components/Loading';
import { OrderHistoryList } from  '../../components/OrderHistoryList';

import { useDispatch, useSelector } from 'react-redux';

export default function OrderHistory () {
    const dispatch = useDispatch();

    const customerOrders = useSelector(selectCustomerOrders);
    const isLoading = useSelector(selectIsCustomerOrdersLoading);

    useEffect(() => {
        dispatch(getOrdersByCustomer());
    }, [dispatch]);

    return isLoading ? <Loading/> : <OrderHistoryList ordersHistory={customerOrders}/>;
}
