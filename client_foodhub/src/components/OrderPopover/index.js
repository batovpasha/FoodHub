import React from 'react';

import { Typography, Button, Card, Chip } from '@material-ui/core';
import { shadows } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router';
import { routes } from '../../routes';
import { selectPickedDishes, removeSelectedDishById } from '../../store';
import { useSelector, useDispatch } from 'react-redux';

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

    const orderedDishes = useSelector(selectPickedDishes);
    const dispatch = useDispatch();

    const history = useHistory();

    const makeOrder = () => {
        history.replace(routes.order);
    };

    return (
        <Card {...props} className={classes.root}>
            <div
                style={{
                    width: '80%',
                }}
            >
                <Typography variant="h6">
                    <span style={{ fontWeight: 'bold' }}>Ваш заказ:</span>&nbsp;
                    <span>
                        {orderedDishes.map(dish => {
                            return (
                                <Chip
                                    style={{ marginRight: '10px' }}
                                    label={dish.title}
                                    onDelete={() =>
                                        dispatch(
                                            removeSelectedDishById(dish.id)
                                        )
                                    }
                                />
                            );
                        })}
                    </span>
                </Typography>
                <Typography variant="h6">
                    <span style={{ fontWeight: 'bold' }}>Цена:</span>&nbsp;
                    <span>
                        {orderedDishes.size
                            ? orderedDishes
                                  .map(dish => dish.price)
                                  .reduce((acc, value) => acc + value) + ' грн'
                            : null}
                    </span>
                </Typography>
            </div>
            <div className={classes.button}>
                <Button
                    fullWidth
                    color="secondary"
                    variant="contained"
                    size="large"
                    disabled={!orderedDishes.size}
                    onClick={makeOrder}
                >
                    Заказать
                </Button>
            </div>
        </Card>
    );
}
