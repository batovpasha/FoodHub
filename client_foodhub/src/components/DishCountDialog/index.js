import React, { useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const DishCountDialog = ({ title, isOpen, setOpen, count, setCount }) => {

    const handleChangeValue = ( { target: { value } } ) => setCount(value);

    useEffect(() => {
        if (!count && isOpen) setCount(1);
    }, [isOpen, count, setCount]);

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
                        inputProps={{ max: 10, min: 0 }}
                        onChange={handleChangeValue}
                        fullWidth
                        type="number"
                    />
                    <Button
                        style={{ marginLeft: '20px' }}
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => setOpen(false)}
                    >
                        Подтвердить
                    </Button>
                </DialogContentText>
            </DialogContent>
            <DialogActions></DialogActions>
        </Dialog>
    );
}
