//Core
import React, { useEffect, useState } from 'react';
// Instruments
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { routes } from '../../routes';

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
    const history = useHistory();

    const [ orderInfo, setOrderInfo ] = useState(null);

    useEffect(() => {
        const { location : { state } } = history;

        if (!state) history.replace(routes.restaurants);
        else setOrderInfo(state);

    }, [history]);

    return (
        <div className={classes.root}>
            <OrderForm orderInfo={orderInfo}/>
        </div>
    )
}
