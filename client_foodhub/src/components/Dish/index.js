// Core
import React, { useState, useEffect } from 'react';
// Instruments
import { Grid } from '@material-ui/core';
import { DishCountDialog } from '../DishCountDialog';
import { useDispatch, useSelector } from 'react-redux';
import { pickDish, removeDish, selectPickedDishes } from '../../store';
import DishCard from '../DishCard';

export default function Dish({ id, title, price, description }) {
    const [checked, setChecked] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [count, setCount] = useState(null);

    const orderedDishes = useSelector(selectPickedDishes);

    const dispatch = useDispatch();

    const handleChange = () => {
        const newChecked = !checked;
        setChecked(newChecked);

        if (newChecked) {
            setIsDialogOpen(true);
            setCount(1);
        } else {
            dispatch(removeDish(id, count));
        }
    };

    useEffect(() => {
        if (!orderedDishes.size) setChecked(false);
    }, [id, orderedDishes]);

    useEffect(() => {
        return () => {
            dispatch(removeDish(id, count));
        };
    }, [count, dispatch, id]);

    const pickDishHandler = () => {
        setIsDialogOpen(false);
        dispatch(pickDish(id, count));
    };

    return (
        <Grid item xs={6}>
            <DishCard
                handleChange={handleChange}
                id={id}
                title={title}
                description={description}
                checked={checked}
                price={price}
            />
            <DishCountDialog
                title={title}
                isOpen={isDialogOpen}
                setOpen={setIsDialogOpen}
                click={pickDishHandler}
                setCount={setCount}
                count={count}
            />
        </Grid>
    );
}
