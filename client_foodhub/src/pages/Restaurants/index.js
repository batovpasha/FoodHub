// Core
import React from 'react';
// Instruments
import { makeStyles } from '@material-ui/core/styles';
// Components
import RestaurantsList from '../../containers/RestaurantsList';
import Search from '../../components/Search';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}));

export default function Restaurants () {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Search />
            <RestaurantsList/>
        </div>
    )
}
