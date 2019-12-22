import React, { useCallback } from 'react';
import Container from '@material-ui/core/Container';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import StoreIcon from '@material-ui/icons/Store';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { selectIsUserProducer } from '../../store';
import ActionCard from '../../components/ActionCard';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router';
import { routes } from '../../routes';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(5),
    },
    grid: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(5),
    },
}));

export default function Home() {
    const classes = useStyles();

    // const dispatch = useDispatch();
    // const onSignOut = useCallback(() => {
    //     dispatch(signOut());
    // }, [dispatch]);

    const history = useHistory();

    const redirect = useCallback(path => history.push(path), [history]);

    const iconProps = {
        color: 'secondary',
        style: { fontSize: 64 },
    };

    const homeActions = [
        {
            caption: 'Create order',
            icon: <FastfoodIcon {...iconProps} />,
            onAction: () => redirect(routes.restaurants),
        },
        {
            caption: 'Orders history',
            icon: <DescriptionIcon {...iconProps} />,
            onAction: () => redirect(routes.orderHistory),
        },
        {
            caption: 'Manage account',
            icon: <AccountBoxIcon {...iconProps} />,
            onAction: () => redirect(routes.account),
        },
    ];

    const isUserProducer = useSelector(selectIsUserProducer);

    if (isUserProducer) {
        homeActions.push({
            caption: 'Manage business',
            icon: <StoreIcon {...iconProps} />,
            onAction: () => console.log('manage business'),
        });
    }

    return (
        <Container component="main" maxWidth="xl" className={classes.container}>
            <Grid
                container
                justify="center"
                className={classes.grid}
                spacing={5}
            >
                {homeActions.map(props => (
                    <Grid item key={props.caption}>
                        <ActionCard {...props} />
                    </Grid>
                ))}
            </Grid>
            {/* <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={onSignOut}
            >
                Sign out
            </Button> */}
        </Container>
    );
}
