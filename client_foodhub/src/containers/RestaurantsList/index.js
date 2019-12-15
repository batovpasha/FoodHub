// Core
import React from 'react';
// Instruments
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
// Components
import Restaurant from '../../components/Restaurant';
import Search from '../../components/Search';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '1180px',
        background: '#efefee',
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
    return (
        <div className={classes.root}>
            <Search/>
            <Grid container>
                <Grid container spacing={3}>
                    <Restaurant/>
                    <Restaurant/>
                </Grid>

                <Grid container spacing={3}>
                    <Restaurant/>
                    <Restaurant/>
                </Grid>

                <Grid container spacing={3}>
                    <Restaurant/>
                    <Restaurant/>
                </Grid>
            </Grid>
        </div>
    );
}
