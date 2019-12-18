// Core
import React from 'react';
// Instruments
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
// Components
import Dish from '../../components/Dish';

const useStyles = makeStyles(theme => ({
    root: {
        alignSelf: 'center',
    },
    card: {
        padding: theme.spacing(3),
        margin:  theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

export default function DishesList() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid container spacing={3}>
                    <Dish/>
                    <Dish/>
                </Grid>

                <Grid container spacing={3}>
                    <Dish/>
                    <Dish/>
                </Grid>

                <Grid container spacing={3}>
                    <Dish/>
                    <Dish/>
                </Grid>

                <Grid container spacing={3}>
                    <Dish/>
                    <Dish/>
                </Grid>
                <Grid container spacing={3}>
                    <Dish/>
                    <Dish/>
                </Grid>
                <Grid container spacing={3}>
                    <Dish/>
                    <Dish/>
                </Grid>
            </Grid>
        </div>
    );
}
