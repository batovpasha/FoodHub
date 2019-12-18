import React, {useCallback} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {signOut} from '../../store';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(3, 0, 2),
    },
}));

export default function Home() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const onSignOut = useCallback(() => {
        dispatch(signOut())
    }, [dispatch]);

    return (
        <Container component="main" maxWidth="xs">
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={onSignOut}
            >
                Sign out
            </Button>
        </Container>
    );
}
