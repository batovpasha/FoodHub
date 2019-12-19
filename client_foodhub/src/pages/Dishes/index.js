// Core
import React, { useEffect } from 'react';
// Instruments
import { useDispatch, useSelector } from 'react-redux';
import { getDishes, selectAllDishes, selectIsDishesLoading } from '../../store';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
// Components
import Loading from '../../components/Loading';
import DishesList from '../../components/DishesList';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        maxWidth: '1380px',
    }
}));

export default function Dishes (props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const dishes = useSelector(selectAllDishes);
    const isLoading = useSelector(selectIsDishesLoading);

    useEffect(() => {
        const restaurantId = props.match.params.restaurant;
        dispatch(getDishes(restaurantId));
    }, [dispatch, props.match.params.restaurant]);

    if (isLoading) return <Loading />;

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Typography variant="h3" style={{ marginTop: '10px', fontWeight: 'bold' }}>Заказ:</Typography>
                <Typography variant="h6" style={{ marginBottom: '10px', color: 'gray' }}>Выберите блюда и наслаждайтесь</Typography>
                <DishesList dishes={dishes}/>
            </div>
        </div>
    )
}
