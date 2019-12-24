import React, { useCallback, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import StoreIcon from '@material-ui/icons/Store';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addPlace } from '../../store';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    input: {
        display: 'none',
    },
    uploadContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(2),
    },
    fileName: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
}));

export default function AddPlaceForm() {
    const classes = useStyles();

    // const history = useHistory();
    // const redirect = useCallback(() => history.push('/'), [history]);

    const dispatch = useDispatch();
    const onSubmit = useCallback(
        e => {
            const formData = new FormData(e.target);

            const placeName = formData.get('place-name');
            const address = formData.get('place-address');
            const description = formData.get('place-description');
            const placeImage = formData.get('place-picture');

            dispatch(addPlace({ placeName, description, address, placeImage }));

            e.preventDefault();
        },
        [dispatch]
    );

    const [isFileLoading, setIsFileLoading] = useState(false);
    const [fileName, setFileName] = useState('');

    const onChange = useCallback(e => {
        const file = e.currentTarget.files[0];

        setFileName(file.name);
        setIsFileLoading(true);

        const reader = new FileReader(file);
        reader.addEventListener('load', () => setIsFileLoading(false));
        reader.readAsDataURL(file);
    }, []);

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <StoreIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add Place
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="place-name"
                        label="Place Name"
                        name="place-name"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="place-address"
                        label="Place Address"
                        name="place-address"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows="4"
                        name="place-description"
                        label="Place Description"
                        id="place-description"
                    />
                    <div className={classes.uploadContainer}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="place-picture"
                            name="place-picture"
                            type="file"
                            onChange={onChange}
                        />
                        <label htmlFor="place-picture">
                            <Button
                                variant="contained"
                                color="primary"
                                component="span"
                            >
                                Upload
                            </Button>
                        </label>
                        {fileName && (
                            <Typography
                                className={classes.fileName}
                                variant="body1"
                            >
                                {fileName}
                            </Typography>
                        )}
                        {isFileLoading && (
                            <CircularProgress color="secondary" />
                        )}
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Add Place
                    </Button>
                </form>
            </div>
        </Container>
    );
}
