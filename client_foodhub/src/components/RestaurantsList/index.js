// Core
import React from 'react';
// Instruments
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
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function RestaurantsList({ searchValue, restaurants }) {
    const classes = useStyles();

    if (!restaurants) return null;

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid container spacing={3}>
                    {restaurants
                        .filter(r =>
                            r['place_name']
                                .toLowerCase()
                                .includes(searchValue.toLowerCase())
                        )
                        .map(restaurant => (
                            <Restaurant
                                {...restaurant}
                                name={restaurant['place_name']}
                                key={restaurant.id}
                                image={`${process.env.REACT_APP_PLACE_API_BASE_URL}/place/image?id=${restaurant.id}`}
                            />
                        ))}
                </Grid>
            </Grid>
        </div>
    );
}
