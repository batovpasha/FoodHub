import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectUserDataErrorMessage,
    selectIsUserErrorExist,
    selectIsUserDataLoading,
    changeUserRole,
} from '../../store';
import Loading from '../Loading';
import ErrorSnackBar from '../ErrorSnackBar';
import { useHistory } from 'react-router';
import { routes } from '../../routes';

const useStyles = makeStyles(theme => ({
    caption: {
        margin: theme.spacing(5),
    },
    grid: {
        flexGrow: 1,
        marginLeft: theme.spacing(2.5),
        marginRight: theme.spacing(2.5),
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}));

export default function StartAsProducer({ caption = 'Business opportunity' }) {
    const classes = useStyles();

    const isLoading = useSelector(selectIsUserDataLoading);
    const isError = useSelector(selectIsUserErrorExist);
    const errorMessage = useSelector(selectUserDataErrorMessage);

    const history = useHistory();
    const redirect = useCallback(() => {
        history.push(routes.businessAccount);
    }, [history]);

    const dispatch = useDispatch();
    const onClick = useCallback(() => {
        dispatch(changeUserRole('producer', redirect));
    }, [dispatch, redirect]);

    return (
        <div>
            <Typography className={classes.caption} variant="h2">
                {caption}
            </Typography>
            {isLoading ? (
                <Loading />
            ) : (
                <Grid
                    wrap="nowrap"
                    container
                    className={classes.grid}
                    spacing={5}
                >
                    <Grid item>
                        <img
                            alt="food"
                            src="https://media-cdn.tripadvisor.com/media/photo-s/19/66/aa/0b/faites-votre-choix-parmi.jpg"
                        />
                    </Grid>
                    <Grid item className={classes.content}>
                        <Typography variant="body1">
                            You can easily expand your business with FoodHub for
                            free! <br />
                            {'Motiavation text '.repeat(20)}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onClick}
                        >
                            Start as Producer
                        </Button>
                    </Grid>
                    <ErrorSnackBar isError={isError} message={errorMessage} />
                </Grid>
            )}
        </div>
    );
}
