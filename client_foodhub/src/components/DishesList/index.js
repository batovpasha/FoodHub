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

export default function DishesList({ dishes }) {
    const classes = useStyles();

    if (!dishes) return null;

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid container spacing={3}>
                { dishes.map((dish, index) => (
                    <Dish key={index} {...dish}/>
                )) }
                </Grid>
            </Grid>
        </div>
    );
}
