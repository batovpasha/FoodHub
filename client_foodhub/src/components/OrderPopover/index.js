import React from 'react';

import { Typography, Button, Card } from '@material-ui/core';
import { shadows } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        left: '10%',
        bottom: 10,
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: shadows[1],
        padding: 20,
        paddingLeft: 50,
        width: '80%',
    },
    button: {
        position: "absolute",
        right: 30,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 250,
    }
}));

export const OrderPopover = (props) => {
    const classes = useStyles();
    const orderedDishes = ['Бигмак', 'Big tasty', 'Small tasty'];

    return (
        <Card {...props} className={classes.root}>
            <Typography variant="h6">
                <span style={{ fontWeight: 'bold' }}>Ваш заказ:</span>&nbsp;
                <span>{ orderedDishes.join(', ') }</span>&nbsp;
            </Typography>
            <Typography variant="h6">
                <span style={{ fontWeight: 'bold' }}>Цена:</span>&nbsp;
                <span>152 грн</span>
            </Typography>
            <div className={classes.button}>
                <Button fullWidth color="secondary" variant="contained" size="large">
                    Заказать
                </Button>
            </div>
        </Card>
    );
}
