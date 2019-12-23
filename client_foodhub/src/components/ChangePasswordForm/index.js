import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectUserDataErrorMessage,
    selectIsUserErrorExist,
    selectIsUserDataLoading,
} from '../../store';
import Loading from '../Loading';
import ErrorSnackBar from '../ErrorSnackBar';
import { useHistory } from 'react-router';
import { routes } from '../../routes';

const useStyles = makeStyles(theme => ({
    caption: {
        margin: theme.spacing(5),
    },
}));

export default function ChangePasswordForm({ caption = 'Change Password' }) {
    const classes = useStyles();

    const isLoading = useSelector(selectIsUserDataLoading);
    const isError = useSelector(selectIsUserErrorExist);
    const errorMessage = useSelector(selectUserDataErrorMessage);

    const history = useHistory();
    const redirect = useCallback(() => {
        history.push(routes.home);
    }, [history]);

    const dispatch = useDispatch();
    const onSubmit = useCallback(() => {
        redirect();
    }, [redirect]);

    return (
        <div>
            <Typography className={classes.caption} variant="h2">
                {caption}
            </Typography>
            {isLoading ? (
                <Loading />
            ) : (
                <ErrorSnackBar isError={isError} message={errorMessage} />
            )}
        </div>
    );
}
