// Core
import React, { useState, useEffect } from 'react';
// Instruments
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Typography, Checkbox } from '@material-ui/core';
import { DishCountDialog } from '../DishCountDialog';
import { useDispatch, useSelector } from 'react-redux';
import { selectDish, removeAllSelectedDishesById, selectPickedDishes } from '../../store';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: 'bold',
    },
    image: {
        maxWidth: '100%',
        height: 190,
    },
    card: {
        padding: theme.spacing(2),
        margin:  theme.spacing(1),
        color: theme.palette.text.secondary,
        cursor: 'pointer',
    },
    content: {
        padding: theme.spacing(1),
        position: 'relative',
    },
    description: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(1),
    },
    checkbox: {
        position: 'absolute',
        top: 0,
        right: 0,
    }
}));

export default function Dish({ id, title, image, price, description }) {
    const classes = useStyles();
    const [ checked, setChecked ] = useState(false);
    const [ count, setCount ] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const orderedDishes = useSelector(selectPickedDishes);

    const dispatch = useDispatch();

    const handleChange = ({ target: { checked } }) => setChecked(checked);

    useEffect(() => {
        if (!orderedDishes.size) setChecked(false);
    }, [id, orderedDishes]);

    useEffect(() => {
        if (checked) {
            setIsDialogOpen(true);
        } else if (count) {
            dispatch(removeAllSelectedDishesById(id));
        }
    }, [checked, count, dispatch, id])

    useEffect(() => {
        if (!isDialogOpen && count) {
            dispatch(selectDish(id, count))
        }
    }, [count, dispatch, id, isDialogOpen])

    useEffect(() => {
        return () => dispatch(removeAllSelectedDishesById(id));
    }, [dispatch, id]);

    return (
        <Grid item xs={6}>
            <Card
                onClick={() => setChecked(prev => !prev)}
                className={classes.card}
            >
                <Grid container direction={'row'}>
                    <Grid item xs={4}>
                        <img
                            className={classes.image}
                            alt={'alt'}
                            src={image}
                        />
                    </Grid>
                    <Grid className={classes.content} item xs={8}>
                        <Typography
                            className={classes.title}
                            variant={'h5'}
                            gutterBottom
                        >
                            {title}
                        </Typography>
                        <div className={classes.description}>
                            <span>{description}</span>
                        </div>
                        <div
                            className={classes.description}
                            style={{ justifyContent: 'flex-end' }}
                        >
                            <Typography
                                variant={'h4'}
                                style={{ color: '#ff7043' }}
                            >
                                {price} грн
                            </Typography>
                        </div>
                        <Checkbox
                            className={classes.checkbox}
                            checked={checked}
                            onChange={handleChange}
                            size={'medium'}
                            color={'primary'}
                            value="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </Grid>
                </Grid>
            </Card>

            <DishCountDialog
                title={title}
                isOpen={isDialogOpen}
                setOpen={setIsDialogOpen}
                setCount={setCount}
                count={count}
            />
        </Grid>
    );
}
