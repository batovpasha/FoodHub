import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectUserDataErrorMessage,
    selectIsUserErrorExist,
    selectIsUserDataLoading,
    changePassword,
} from '../../store';
import SnackBar from '../SnackBar';
import { useControlledInput } from '../../hooks';

const useStyles = makeStyles(theme => ({
    caption: {
        margin: theme.spacing(5),
    },
    paper: {
        margin: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '50%',
        minWidth: 400,
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    indicator: {
        position: 'absolute',
        right: theme.spacing(2),
        top: `calc(50% - 8px)`,
    },
    relativeWrap: {
        position: 'relative',
    },
}));

function Indicator({ isValid, hidden, className }) {
    if (hidden) {
        return null;
    } else {
        return isValid ? (
            <CheckCircleIcon color="primary" className={className} />
        ) : (
            <HighlightOffIcon color="secondary" className={className} />
        );
    }
}

export default function ChangePasswordForm({ caption = 'Change Password' }) {
    const classes = useStyles();

    const isLoading = useSelector(selectIsUserDataLoading);
    const isError = useSelector(selectIsUserErrorExist);
    const errorMessage = useSelector(selectUserDataErrorMessage);

    const [oldPswdValue, onOldPswdChange] = useControlledInput('');
    const [newPswdValue, onNewPswdChange] = useControlledInput('');
    const [confirmPswdValue, onConfirmPswdChange] = useControlledInput('');

    const isNewPswdValid = newPswdValue !== oldPswdValue;
    const isConfirmPswdValid = newPswdValue === confirmPswdValue;

    const isButtonDisabled =
        !newPswdValue.length ||
        !oldPswdValue.length ||
        !confirmPswdValue.length ||
        !isNewPswdValid ||
        !isConfirmPswdValid;

    const dispatch = useDispatch();
    const onSubmit = useCallback(() => {
        if (!isButtonDisabled) {
            dispatch(changePassword(oldPswdValue, newPswdValue));
        }
    }, [dispatch, isButtonDisabled, newPswdValue, oldPswdValue]);

    return (
        <div>
            <CssBaseline />
            <Typography className={classes.caption} variant="h2">
                {caption}
            </Typography>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="old-password"
                        label="Old Password"
                        type="password"
                        autoComplete="current-password"
                        value={oldPswdValue}
                        onChange={onOldPswdChange}
                    />
                    <div className={classes.relativeWrap}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="new-password"
                            label="New Password"
                            type="password"
                            value={newPswdValue}
                            onChange={onNewPswdChange}
                        />
                        <Indicator
                            hidden={!newPswdValue.length}
                            isValid={isNewPswdValid}
                            className={classes.indicator}
                        />
                    </div>
                    <div className={classes.relativeWrap}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="new-password-confirm"
                            label="Confirm New Password"
                            type="password"
                            value={confirmPswdValue}
                            onChange={onConfirmPswdChange}
                        />
                        <Indicator
                            hidden={!confirmPswdValue.length}
                            isValid={isConfirmPswdValid}
                            className={classes.indicator}
                        />
                    </div>
                    {isLoading ? (
                        <CircularProgress
                            className={classes.submit}
                            color="secondary"
                        />
                    ) : (
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isButtonDisabled}
                        >
                            Change Password
                        </Button>
                    )}
                </form>
            </div>
            <SnackBar
                hidden={!isError}
                variant="error"
                message={errorMessage}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            />
        </div>
    );
}
