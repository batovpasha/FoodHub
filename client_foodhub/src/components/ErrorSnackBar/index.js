import React, {useState} from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
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
  }
}));

export default function ErrorSnackBar({ isError, message }) {
    const classes = useStyles();

    const [open, setOpen] = useState(isError);
    const handleClose = (_e, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
    >
        <SnackbarContent
            className={classes.error}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <ErrorIcon className={classes.iconVariant} />
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
        />
      </Snackbar>
    );
}
