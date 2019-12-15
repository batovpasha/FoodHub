import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, InputBase, IconButton, MenuItem, FormHelperText, FormControl, Select } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: 10,
        padding: 10,
        position: 'sticky',
        top: 0,
        background: '#81c784',
        zIndex: 100,
        overflow: 'hidden',
    },
    content: {
        display: 'flex',
        alignItems: 'center',
    },
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    button: {
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Search() {
    const classes = useStyles();
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState('');

    const handleLocation = ({ target: { value } }) => setLocation(value);
    const handleRating = ({ target: { value } }) => setRating(value);

    return (
        <div className={classes.root}>
            <Grid className={classes.content} container spacing={2}>
                <Grid item xs={8}>
                    <Paper component="form" className={classes.search}>
                        <InputBase
                            className={classes.input}
                            placeholder="Поиск ( напр. Макдональдс )"
                            inputProps={{ 'aria-label': 'Поиск ( напр. Макдональдс )' }}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <FormControl className={classes.formControl}>
                        <Select value={location} onChange={handleLocation} displayEmpty className={classes.selectEmpty}>
                            <MenuItem value="" disabled>
                                Локация
                            </MenuItem>
                            <MenuItem value={1}>КПИ</MenuItem>
                            <MenuItem value={2}>Шулявка</MenuItem>
                            <MenuItem value={3}>НАУ</MenuItem>
                        </Select>
                        <FormHelperText>Локация</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl className={classes.formControl}>
                        <Select value={rating} onChange={handleRating} displayEmpty className={classes.selectEmpty}>
                            <MenuItem value="" disabled>
                                Рейтинг
                            </MenuItem>
                            <MenuItem value={1}>Одна звезда</MenuItem>
                            <MenuItem value={2}>Две звезды</MenuItem>
                            <MenuItem value={3}>Три звезды</MenuItem>
                            <MenuItem value={4}>Четыре звезды</MenuItem>
                            <MenuItem value={5}>Пять звезд</MenuItem>
                        </Select>
                        <FormHelperText>Рейтинг</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
}
