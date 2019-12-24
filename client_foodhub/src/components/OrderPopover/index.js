import React, { useState } from 'react';

import { Typography, Button, Card, Chip } from '@material-ui/core';
import { shadows } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';

import { DishCountDialog } from '../DishCountDialog';
import { useHistory } from 'react-router';
import { routes } from '../../routes';
import { selectPickedDishes, removeDish } from '../../store';
import { useLocation } from 'react-router';
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
    const location = useLocation();

    const getLabel = ( label, count ) => {
        if (count > 1) {
            return label + ' x ' + count;
        }
        return label;
    }

    const [isOpen, setOpen] = useState(false);
    const [countToDelete, setCountToDelete] = useState(null);
    const [maxInDialogValue, setMaxInDialogValue] = useState(null);

    const [activeDish, setActiveDish] = useState(null);

    const makeOrder = () => {
        history.replace({
            pathname: routes.order,
            state: {
                products: orderedDishes.toJS(),
                placeId: location.pathname.split('/')[1],
            },
        });
    };

    const setDish = (dish) => {
        const count = dish.get('count');

        setMaxInDialogValue(count);
        setCountToDelete(1);
        setActiveDish(dish);
        setOpen(true);
    }

    const deleteDish = (id, count) => {
        dispatch(removeDish(id, count));
        setOpen(false);
    }

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
                                    label={getLabel(
                                        dish.get('title'),
                                        dish.get('count')
                                    )}
                                    onDelete={() =>
                                        dish.get('count') > 1
                                            ? setDish(dish)
                                            : deleteDish(
                                                  dish.get('id'),
                                                  dish.get('count')
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
                                  .map(
                                      dish =>
                                          dish.get('price') * dish.get('count')
                                  )
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
            <DishCountDialog
                isOpen={isOpen}
                setOpen={setOpen}
                count={countToDelete}
                setCount={setCountToDelete}
                title={'удаления'}
                max={maxInDialogValue}
                click={() => deleteDish(activeDish.get('id'), countToDelete)}
            />
        </Card>
    );
}
