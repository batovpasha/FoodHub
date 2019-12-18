// Core
import React from 'react';
// Instruments
import { makeStyles } from '@material-ui/core/styles';
// Components
import RestaurantsList from '../../components/RestaurantsList';
import Search from '../../components/Search';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: theme.palette.grey[100]
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
