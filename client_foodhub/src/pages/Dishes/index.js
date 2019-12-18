// Core
import React from 'react';
// Instruments
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
// Components
import DishesList from '../../components/DishesList';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#b2fab4',
    },
    content: {
        maxWidth: '1380px',
    }
}));

export default function Dishes (props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Typography variant="h3" style={{ marginTop: '10px', fontWeight: 'bold' }}>Заказ:</Typography>
                <Typography variant="h6" style={{ marginBottom: '10px', color: 'gray' }}>Выберите блюда и наслаждайтесь</Typography>
                <DishesList />
            </div>
        </div>
    )
}
