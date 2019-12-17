//Core
import React from 'react';
// Instruments
import { makeStyles } from '@material-ui/core/styles';
// Components
import OrderForm from '../../components/OrderForm';

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
            <OrderForm />
        </div>
    )
}
