import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const DishCountDialog = ({ title, isOpen, setOpen, count, setCount, max, click }) => {

    const handleChangeValue = ( { target: { value } }) => {
        const maximum = max || 100;
        if (Number(value) > maximum) {
            setCount(maximum);
        } else {
            setCount(Number(value));
        }
    }

    return (
        <Dialog
            open={isOpen}
            disableBackdropClick
            disableEscapeKeyDown
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Укажите количество для {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                    id="alert-dialog-description"
                >
                    <TextField
                        value={count}
                        inputProps={{ max: max ?? 100, min: 1, style: {textAlign: 'center'}}}
                        onChange={handleChangeValue}
                        fullWidth
                        type="tel"
                    />
                    <Button
                        style={{ marginLeft: '20px' }}
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={click}
                    >
                        Подтвердить
                    </Button>
                </DialogContentText>
            </DialogContent>
            <DialogActions></DialogActions>
        </Dialog>
    );
}
