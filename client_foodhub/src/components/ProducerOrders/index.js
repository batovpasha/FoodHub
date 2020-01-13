import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import {
    getOrdersByProducer,
    selectProducerOrders,
    selectIsProducerOrdersLoading,
} from '../../store';
import Loading from '../Loading';
import { OrderHistoryList } from '../OrderHistoryList';

const useStyles = makeStyles(theme => ({
    caption: {
        margin: theme.spacing(5),
    },
}));

export default function ProducerOrders() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const customerOrders = useSelector(selectProducerOrders);
    const isLoading = useSelector(selectIsProducerOrdersLoading);

    useEffect(() => {
        dispatch(getOrdersByProducer());
    }, [dispatch]);

    return (
        <div>
            <Typography className={classes.caption} variant="h2">
                Orders
            </Typography>
            {isLoading ? (
                <Loading />
            ) : (
                <OrderHistoryList ordersHistory={customerOrders} />
            )}
        </div>
    );
}
