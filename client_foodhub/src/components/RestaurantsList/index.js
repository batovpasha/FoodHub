// Core
import React from 'react';
// Instruments
import { useSelector } from 'react-redux';
import { selectAllRestaurants } from '../../store';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
// Components
import Restaurant from '../../components/Restaurant';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '1380px',
        alignSelf: 'center',
    },
    card: {
        padding: theme.spacing(3),
        margin:  theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

export default function RestaurantsList() {
    const classes = useStyles();
    const restaurants = useSelector(selectAllRestaurants);

    if (!restaurants) return null;

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid container spacing={3}>
                    { restaurants.map(restaurant => (
                        <Restaurant {...restaurant.toObject()}/>
                    )) }
                </Grid>
            </Grid>
        </div>
    );
}
