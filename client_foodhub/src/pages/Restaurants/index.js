// Core
import React, { useState, useEffect } from 'react';
// Instruments
import { makeStyles } from '@material-ui/core/styles';
import { getLocations, getRestaurants, selectAllLocations, selectAllRestaurants} from '../../store';
// Components
import RestaurantsList from '../../components/RestaurantsList';
import Search from '../../components/Search';

import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}));

export default function Restaurants () {
    const classes = useStyles();
    const dispatch = useDispatch();

    const locations = useSelector(selectAllLocations);
    const restaurants = useSelector(selectAllRestaurants);

    useEffect(() => {
        dispatch(getLocations());
        dispatch(getRestaurants());
    }, [dispatch]);

    // hardcoded for presentation, will change soon
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className={classes.root}>
            <Search searchValue={searchValue} setSearchValue={setSearchValue} locations={locations} />
            <RestaurantsList searchValue={searchValue} restaurants={restaurants} />
        </div>
    );
}
