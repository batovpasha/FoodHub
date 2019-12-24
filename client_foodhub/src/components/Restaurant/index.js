// Core
import React from 'react';
// Instruments
import { Link, generatePath } from 'react-router-dom';
import { routes } from '../../routes';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Typography, IconButton } from '@material-ui/core';
// Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import DeleteIcon from '@material-ui/icons/Delete';

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
        margin: theme.spacing(1),
        minWidth: 600,
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
    delete: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
}));

export default function Restaurant(props) {
    const { id, name, image, description, address, onDelete, asLink } = props;
    const classes = useStyles();

    const card = (
        <Card className={classes.card}>
            <Grid container direction={'row'}>
                <Grid
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    item
                    xs={4}
                >
                    <img className={classes.image} alt={'alt'} src={image} />
                </Grid>
                <Grid className={classes.content} item xs={8}>
                    <Typography
                        className={classes.title}
                        variant={'h5'}
                        gutterBottom
                    >
                        {name}
                    </Typography>
                    <div className={classes.distance}>
                        <LocationOnIcon fontSize={'inherit'} />
                        <span style={{ marginLeft: '5px' }}>{address}</span>
                    </div>
                    <div className={classes.distance}>
                        <FastfoodIcon fontSize={'inherit'} />
                        <span style={{ marginLeft: '5px' }}>{description}</span>
                    </div>
                    {onDelete && (
                        <IconButton
                            className={classes.delete}
                            onClick={onDelete}
                        >
                            <DeleteIcon color="primary" />
                        </IconButton>
                    )}
                </Grid>
            </Grid>
        </Card>
    );

    return (
        <Grid item xs={6}>
            {asLink ? (
                <Link to={generatePath(routes.dishes, { restaurant: id })}>
                    {card}
                </Link>
            ) : (
                card
            )}
        </Grid>
    );
}
