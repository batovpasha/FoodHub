import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TabPanels from '../../components/TabPanels';
import SignOutButton from '../../components/SignOutButton';
import PlacesList from '../../components/PlacesList';
import { useDispatch } from 'react-redux';
import { fetchPlaces } from '../../store';

const useStyles = makeStyles(theme => ({
    button: {
        position: 'absolute',
        bottom: theme.spacing(3),
        left: theme.spacing(6),
    },
}));

const panels = [
    {
        label: 'Places',
        component: <PlacesList />,
    },
    {
        label: 'Products',
        component: 'Products',
    },
    {
        label: 'Orders',
        component: 'Orders',
    },
];

export default function BusinessAccount() {
    const classes = useStyles();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPlaces());
    }, [dispatch]);

    return (
        <TabPanels
            panels={panels}
            footer={<SignOutButton className={classes.button} />}
        />
    );
}
