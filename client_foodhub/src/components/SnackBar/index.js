import React, { useState } from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import { green } from '@material-ui/core/colors';

const variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
    error: {
        backgroundColor: theme.palette.secondary.main,
    },
    success: {
        backgroundColor: green[600],
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

export default function SnackBar({ hidden, message, variant, anchorOrigin }) {
    const classes = useStyles();

    const [open, setOpen] = useState(!hidden);
    const handleClose = (_e, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const Icon = variantIcon[variant];

    return (
        <Snackbar
            anchorOrigin={anchorOrigin}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <SnackbarContent
                className={classes[variant]}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={classes.iconVariant} />
                        {message}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
}
