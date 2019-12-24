import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TabPanels from '../../components/TabPanels';
import SignOutButton from '../../components/SignOutButton';
import UserInfo from '../../components/UserInfo';
import StartAsProducer from '../../components/StartAsProvider';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import { useSelector } from 'react-redux';
import { selectIsUserProducer } from '../../store';

const useStyles = makeStyles(theme => ({
    button: {
        position: 'fixed',
        bottom: theme.spacing(3),
        left: theme.spacing(6),
    },
}));

const commonPanels = [
    {
        label: 'Account Info',
        component: <UserInfo caption="Account Info" />,
    },
    {
        label: 'Change Password',
        component: <ChangePasswordForm />,
    },
];

const customerPanels = [
    {
        label: 'Start as Producer',
        component: <StartAsProducer />,
    },
];

const producerPanels = [];

export default function Account() {
    const classes = useStyles();

    const isProducer = useSelector(selectIsUserProducer);
    const panels = commonPanels.concat(
        isProducer ? producerPanels : customerPanels
    );

    return (
        <TabPanels
            panels={panels}
            footer={<SignOutButton className={classes.button} />}
        />
    );
}
