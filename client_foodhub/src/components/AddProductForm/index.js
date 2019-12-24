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
import { addProduct } from '../../store';

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

export default function AddProductForm() {
    const classes = useStyles();

    const history = useHistory();
    const placeId = history.location.pathname.split('/')[1];
    // const redirect = useCallback(() => history.push('/'), [history]);

    const dispatch = useDispatch();
    const onSubmit = useCallback(
        e => {
            const formData = new FormData(e.target);

            const productName = formData.get('product-name');
            const description = formData.get('product-description');
            const productImage = formData.get('product-picture');
            const productPrice = formData.get('product-price');

            dispatch(
                addProduct({
                    placeId,
                    productName,
                    description,
                    productImage,
                    price: productPrice,
                })
            );

            e.preventDefault();
        },
        [dispatch, placeId]
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
                    Add Product
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="product-name"
                        label="Product Name"
                        name="product-name"
                        autoFocus
                    />
                    <TextField
                        type="number"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="product-price"
                        label="Product Price"
                        name="product-price"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows="4"
                        name="product-description"
                        label="Product Description"
                        id="product-description"
                    />
                    <div className={classes.uploadContainer}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="product-picture"
                            name="product-picture"
                            type="file"
                            onChange={onChange}
                        />
                        <label htmlFor="product-picture">
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
                        Add Product
                    </Button>
                </form>
            </div>
        </Container>
    );
}
