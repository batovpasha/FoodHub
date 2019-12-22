import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from './logo.svg';
import { routes } from '../../routes';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    logo: {
        width: '300px',
        height: '72px',
    },
}));

export default function Bar() {
    const classes = useStyles();

    const location = useLocation();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to={routes.home}>
                        <Logo className={classes.logo} />
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}
