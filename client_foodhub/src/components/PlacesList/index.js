import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import Restaurant from '../Restaurant';
import Loading from '../Loading';
import {
    selectProducerPlaces,
    selectIsPlacesLoading,
} from '../../store/selectors/place';
import { useHistory } from 'react-router';
import { routes } from '../../routes';
import Button from '@material-ui/core/Button';
import { deletePlace } from '../../store';

const useStyles = makeStyles(theme => ({
    caption: {
        margin: theme.spacing(5),
    },
    list: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
    },
    button: {
        margin: theme.spacing(5),
    },
}));

export default function PlacesList() {
    const classes = useStyles();
    const places = useSelector(selectProducerPlaces);
    const isLoading = useSelector(selectIsPlacesLoading);

    const history = useHistory();
    const addPlace = useCallback(() => {
        history.push(routes.placeAdd);
    }, [history]);

    const dispatch = useDispatch();
    const createOnDelete = useCallback(
        id => () => {
            dispatch(deletePlace(id));
        },
        [dispatch]
    );

    return (
        <div className={classes.list}>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Typography className={classes.caption} variant="h2">
                        Places List
                    </Typography>
                    {places.map(place => (
                        <Restaurant
                            key={place.id}
                            id={place.id}
                            name={place['place_name']}
                            image={`${process.env.REACT_APP_PLACE_API_BASE_URL}/place/image?id=${place.id}`}
                            description={place.description}
                            address={place.address}
                            onDelete={createOnDelete(place.id)}
                            asLink={false}
                        />
                    ))}
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={addPlace}
                        className={classes.button}
                    >
                        Add Place
                    </Button>
                </>
            )}
        </div>
    );
}
