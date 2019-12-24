import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    caption: {
        margin: theme.spacing(5),
    },
}));

export default function ProducerOrders() {
    const classes = useStyles();

    return (
        <div>
            <Typography className={classes.caption} variant="h2">
                Orders
            </Typography>
        </div>
    );
}
