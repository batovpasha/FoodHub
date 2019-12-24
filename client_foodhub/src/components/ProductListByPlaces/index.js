import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductsList from '../ProductsList';
import Loading from '../Loading';
import { Typography, makeStyles } from '@material-ui/core';
import {
    selectIsDishesLoading,
    selectDishesByPlace,
    getProducts,
} from '../../store';

const useStyles = makeStyles(theme => ({
    caption: {
        margin: theme.spacing(5),
    },
    list: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
    },
}));

export default function ProductListByPlaces() {
    const classes = useStyles();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const dishesByPlace = useSelector(selectDishesByPlace);
    const isLoading = useSelector(selectIsDishesLoading);
    console.log(dishesByPlace);

    return (
        <div className={classes.list}>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Typography className={classes.caption} variant="h2">
                        Products
                    </Typography>
                    {dishesByPlace.map(entry => (
                        <ProductsList
                            key={entry.getIn(['place', 'id'])}
                            place={entry.getIn(['place'])}
                            dishes={entry.getIn(['dishes'])}
                        />
                    ))}
                </>
            )}
        </div>
    );
}
