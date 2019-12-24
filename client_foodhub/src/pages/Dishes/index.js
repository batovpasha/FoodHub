// Core
import React, { useEffect } from 'react';
// Instruments
import { useDispatch, useSelector } from 'react-redux';
import {
    getProducts,
    selectAllDishes,
    selectIsDishesLoading,
    selectPickedDishes,
} from '../../store';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Fade } from '@material-ui/core';
// Components
import Loading from '../../components/Loading';
import DishesList from '../../components/DishesList';
import { OrderStepper } from '../../components/OrderStepper';
import { OrderPopover } from '../../components/OrderPopover';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '100%',
        maxWidth: '1380px',
        marginBottom: 125,
    },
}));

export default function Dishes(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const dishes = useSelector(selectAllDishes);
    const isLoading = useSelector(selectIsDishesLoading);

    const orderedDishes = useSelector(selectPickedDishes);

    useEffect(() => {
        const restaurantId = props.match.params.restaurant;
        dispatch(getProducts(restaurantId));
    }, [dispatch, props.match.params.restaurant]);

    if (isLoading) return <Loading />;

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <div style={{ marginTop: '40px' }}>
                    <OrderStepper activeStep={1} />
                </div>
                <Typography
                    variant="h3"
                    style={{ marginTop: '10px', fontWeight: 'bold' }}
                >
                    Заказ:
                </Typography>
                <Typography
                    variant="h6"
                    style={{ marginBottom: '10px', color: 'gray' }}
                >
                    Выберите блюда и наслаждайтесь
                </Typography>
                <DishesList dishes={dishes} />
            </div>
            <Fade in={Boolean(orderedDishes.size)}>
                <OrderPopover />
            </Fade>
        </div>
    );
}
