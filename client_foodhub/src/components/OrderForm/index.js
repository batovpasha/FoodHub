import React, { useState } from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        alignSelf: 'center',
        margin:  theme.spacing(1),
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    title: {
        margin:  theme.spacing(1),
    },
    row: {
        display: 'flex',
        margin:  theme.spacing(1),
    },
    field: {
        flex: 1,
        margin:  theme.spacing(0.5),
    }
}));

export default function OrderForm() {
    const classes = useStyles();

    const [ time, setTime ] = useState(new Date());

    const handleDateChange = date => setTime(date);

    return (
        <div className={classes.root}>
            <Typography style={{ fontWeight: 'bold' }} className={classes.title} variant="h2">
                Информация о заказе
            </Typography>
            <Typography className={classes.title} variant="h5">
                Введите свои данные для завершения заказа
            </Typography>
            <form noValidate autoComplete="off">
                <div className={classes.row}>
                    <TextField className={classes.field} id="name" label="Имя" variant="filled" />
                </div>

                <div className={classes.row}>
                    <TextField className={classes.field} id="phone" label="Телефон" variant="filled" />
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
                        variant="filled"
                    />
                </div>
                <div className={classes.row}>
                    <Button className={classes.field} variant="contained">
                        Подтвердить
                    </Button>
                </div>
            </form>
        </div>
    );
}

