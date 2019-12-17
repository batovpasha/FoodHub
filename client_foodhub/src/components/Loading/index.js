import React from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }
}));

export default function Loading() {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xl" className={classes.root}>
            <CircularProgress color="secondary" size={72} />
        </Container>
    );
}
