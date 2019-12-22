import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import IconButton from '@material-ui/core/IconButton';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from './logo.svg';
import { routes } from '../../routes';
import { selectIsAuthenticated, selectIsUserProducer } from '../../store';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    logo: {
        width: '300px',
        height: '72px',
    },
    wrapper: {
        flexGrow: 1,
    },
    navIcon: {
        color: '#fff',
    },
}));

const navData = {
    account: {
        icon: <AccountCircleIcon />,
        link: routes.account,
    },
    home: {
        icon: <HomeIcon />,
        link: routes.home,
    },
    businessAccount: {
        icon: <BusinessCenterIcon />,
        link: routes.businessAccount,
    },
};

const getNavData = ({ pathname }, isProducer) => {
    const data = [];
    if (isProducer && !pathname.match(routes.businessAccount)) {
        data.push(navData.businessAccount);
    }
    if (!pathname.match(routes.account)) {
        data.push(navData.account);
    }
    if (pathname !== routes.home) {
        data.push(navData.home);
    }
    return data;
};

export default function Bar() {
    const classes = useStyles();

    const location = useLocation();
    const isProducer = useSelector(selectIsUserProducer);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const navigation = useMemo(() => getNavData(location, isProducer), [
        location,
        isProducer,
    ]);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.wrapper}>
                        <Link to={routes.home}>
                            <Logo className={classes.logo} />
                        </Link>
                    </div>
                    {isAuthenticated &&
                        navigation.map(({ icon, link }) => (
                            <Link key={link} to={link}>
                                <IconButton className={classes.navIcon}>
                                    {icon}
                                </IconButton>
                            </Link>
                        ))}
                </Toolbar>
            </AppBar>
        </div>
    );
}
