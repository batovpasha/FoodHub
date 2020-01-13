// Core
import React, { useState, useEffect } from 'react';
// Instruments
import { makeStyles } from '@material-ui/core/styles';
import {
    getLocations,
    selectAllLocations,
    fetchPlaces,
    selectIsPlacesLoading,
    selectPlaces,
} from '../../store';
// Components
import Loading from '../../components/Loading';
import RestaurantsList from '../../components/RestaurantsList';
import Search from '../../components/Search';
import { OrderStepper } from '../../components/OrderStepper';

import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}));

export default function Restaurants() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const locations = useSelector(selectAllLocations);
    const restaurants = useSelector(selectPlaces);
    const isLoading = useSelector(selectIsPlacesLoading);

    useEffect(() => {
        dispatch(getLocations());
        dispatch(fetchPlaces());
    }, [dispatch]);

    // hardcoded for presentation, will change soon
    const [searchValue, setSearchValue] = useState('');

    if (isLoading) return <Loading />;

    return (
        <div className={classes.root}>
            <Search
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                locations={locations}
            />
            <OrderStepper activeStep={0} />
            <RestaurantsList
                searchValue={searchValue}
                restaurants={restaurants}
            />
        </div>
    );
}
