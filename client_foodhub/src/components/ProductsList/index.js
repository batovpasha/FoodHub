import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import DishCard from '../DishCard';
import { Typography } from '@material-ui/core';
import { deleteProduct } from '../../store';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
    caption: {
        margin: theme.spacing(5),
    },
    list: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
    },
    button: {
        margin: theme.spacing(5),
    },
}));

export default function ProductsList({ place, dishes }) {
    const classes = useStyles();

    const history = useHistory();
    const redirect = useCallback(path => history.push(path), [history]);
    const createOnClick = useCallback(
        id => () => redirect(`/${id}/product/add`),
        [redirect]
    );

    const dispatch = useDispatch();
    const createOnDelete = useCallback(
        id => () => {
            dispatch(deleteProduct(id));
        },
        [dispatch]
    );

    return (
        <div className={classes.list}>
            <Typography variant="h5">{`Place: ${place['place_name']}`}</Typography>
            {dishes.map(dish => (
                <DishCard
                    key={dish.id}
                    onDelete={createOnDelete(dish.id)}
                    id={dish.id}
                    title={dish.title}
                    description={dish.description}
                    price={dish.price}
                />
            ))}
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={createOnClick(place.id)}
                className={classes.button}
            >
                {`Add Product to ${place['place_name']}`}
            </Button>
        </div>
    );
}
