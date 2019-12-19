// Core
import React from 'react';
// Instruments
import { Link, generatePath } from 'react-router-dom';
import { routes } from '../../routes';

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
        maxWidth: '100%',
        height: 100,
        display: 'flex',
        alignSelf: 'center',
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

export default function Restaurant(props) {
    const { id, title, image, description, rating, distance } = props;
    const classes = useStyles();

    return (
        <Grid item xs={6}>
            <Link to={ generatePath( routes.dishes, { restaurant: id } ) }>
                <Card className={classes.card}>
                    <Grid container direction={'row'}>
                        <Grid style={{display: 'flex', justifyContent: 'center'}} item xs={4}>
                            <img
                                className={classes.image}
                                alt={'alt'}
                                src={ image }
                            />
                        </Grid>
                        <Grid className={classes.content} item xs={8}>
                            <Typography className={classes.title} variant={'h5'} gutterBottom>
                                {title}
                            </Typography>
                            <div className={classes.distance}>
                                <TrackChangesIcon fontSize={'inherit'} />
                                <span style={{ marginLeft: '5px' }}>{distance} км</span>
                            </div>
                            <div className={classes.distance}>
                                <FastfoodIcon fontSize={'inherit'} />
                                <span style={{ marginLeft: '5px' }}>{description}</span>
                            </div>
                            <Rating className={classes.rating} name="rating" value={rating} readOnly />
                        </Grid>
                    </Grid>
                </Card>
            </Link>
        </Grid>
    );
}
