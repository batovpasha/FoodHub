// Core
import React from 'react';
// Instruments
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
// Icons
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
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
    distance: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(1),
    },
    rating: {
        position: 'absolute',
        top: 0,
        right: 0,
    }
}));

export default function Restaurant() {
    const classes = useStyles();
    return (
        <Grid item xs={6}>
            <Card className={classes.card}>
                <Grid container direction={'row'}>
                    <Grid item xs={4}>
                        <img className={classes.image} alt={'alt'} src='https://delo.ua/files/news/images/3535/14/picture2_mcdonalds-otkryla_353514_p0.jpg'/>
                    </Grid>
                    <Grid className={classes.content} item xs={8}>
                        <Typography className={classes.title} variant={'h5'} gutterBottom>
                            McDonalds
                        </Typography>
                        <div className={classes.distance}>
                            <TrackChangesIcon fontSize={'inherit'}/>
                            <span style={{ marginLeft: '5px' }}>5,5 км</span>
                        </div>
                        <div className={classes.distance}>
                            <FastfoodIcon fontSize={'inherit'}/>
                            <span style={{ marginLeft: '5px' }}>Кухня твоего сердца</span>
                        </div>
                        <Rating className={classes.rating} name="rating" value={5} readOnly/>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}
