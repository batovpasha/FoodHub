import React, { useState, useCallback } from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { sendOrder } from '../../store';
import { selectUserData } from '../../store/selectors/user';
import { routes } from '../../routes';

const useStyles = makeStyles(theme => ({
    root: {
        alignSelf: 'center',
        margin: theme.spacing(1),
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    title: {
        margin: theme.spacing(1),
    },
    row: {
        display: 'flex',
        margin: theme.spacing(1),
    },
    field: {
        flex: 1,
        margin: theme.spacing(0.5),
    },
}));

export default function OrderForm({ orderInfo }) {
    const classes = useStyles();

    const handleDateChange = date => setTime(date);
    const handleNameChange = ({ target: { value } }) => setName(value);
    const handleEmailChange = ({ target: { value } }) => setEmail(value);
    const handleCommentChange = ({ target: { value } }) => setComment(value);

    const { firstName, lastName, email: mail } = useSelector(selectUserData);

    const history = useHistory();
    const redirect = useCallback(() => history.push(routes.home), [history]);

    const [name, setName] = useState(firstName + ' ' + lastName);
    const [email, setEmail] = useState(mail);
    const [time, setTime] = useState(new Date());
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        // normalize products

        const { products: rawProducts, placeId } = orderInfo;

        const products = {};
        rawProducts.forEach(product => (products[product.id] = product.count));

        const data = {
            placeId,
            readyDate: time
                .toISOString()
                .slice(0, 19)
                .replace('T', ' '),
            products,
        };

        dispatch(sendOrder(data, redirect));
    };

    return (
        <div className={classes.root}>
            <Typography
                style={{ fontWeight: 'bold' }}
                className={classes.title}
                variant="h2"
            >
                Информация о заказе
            </Typography>
            <Typography className={classes.title} variant="h5">
                Введите свои данные для завершения заказа
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <div className={classes.row}>
                    <TextField
                        className={classes.field}
                        value={name}
                        onChange={handleNameChange}
                        id="name"
                        label="Имя"
                        variant="filled"
                    />
                </div>

                <div className={classes.row}>
                    <TextField
                        className={classes.field}
                        id="email"
                        label="E-mail"
                        variant="filled"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            className={classes.field}
                            ampm={false}
                            inputVariant={'filled'}
                            fullWidth
                            label={'Время самовывоза'}
                            value={time}
                            onChange={handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className={classes.row}>
                    <TextField
                        multiline
                        rows="5"
                        className={classes.field}
                        id="comment"
                        label="Комментарий"
                        value={comment}
                        onChange={handleCommentChange}
                        variant="filled"
                    />
                </div>
                <div className={classes.row}>
                    <Button
                        type="submit"
                        className={classes.field}
                        variant="contained"
                    >
                        Подтвердить
                    </Button>
                </div>
            </form>
        </div>
    );
}
