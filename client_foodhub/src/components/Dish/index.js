// Core
import React, { useState } from 'react';
// Instruments
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Typography, Checkbox } from '@material-ui/core';

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

export default function Dish() {
    const classes = useStyles();
    const [ checked, setChecked ] = useState(false);

    const handleChange = ({ target: { checked } }) => setChecked(checked);
    return (
        <Grid item xs={6} onClick={() => setChecked(prev => !prev)}>
            <Card className={classes.card}>
                <Grid container direction={'row'}>
                    <Grid item xs={4}>
                        <img
                            className={classes.image}
                            alt={'alt'}
                            src="https://nashagazeta.ch/sites/default/files/styles/article/public/bur-bigmac-big_0_0.jpg?itok=ulBsdGfr"
                        />
                    </Grid>
                    <Grid className={classes.content} item xs={8}>
                        <Typography className={classes.title} variant={'h5'} gutterBottom>
                            Big Mac
                        </Typography>
                        <div className={classes.description}>
                            <span>
                                Топ за свои деньги texttexttexttexttexttex ttexttexttextte xttexttexttex ttexttextt
                                exttexttexttexttext text texttextt exttexttextte xttexttexttextt exttexttexttexttex
                            </span>
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
        </Grid>
    );
}
