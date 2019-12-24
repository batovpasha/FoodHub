import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TabPanels from '../../components/TabPanels';
import SignOutButton from '../../components/SignOutButton';

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
        component: 'Places',
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

    return (
        <TabPanels
            panels={panels}
            footer={<SignOutButton className={classes.button} />}
        />
    );
}
