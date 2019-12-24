import React from 'react';
import {
    Card,
    Grid,
    Typography,
    Checkbox,
    makeStyles,
    IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: 'bold',
    },
    image: {
        maxWidth: '100%',
        height: 190,
    },
    card: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        color: theme.palette.text.secondary,
        cursor: 'pointer',
    },
    content: {
        padding: theme.spacing(1),
        position: 'relative',
    },
    description: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(1),
    },
    checkbox: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    delete: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
}));

export default function DishCard({
    handleChange,
    onDelete,
    id,
    title,
    description,
    checked,
    price,
}) {
    const classes = useStyles();

    return (
        <Card onClick={handleChange} className={classes.card}>
            <Grid container direction={'row'}>
                <Grid item xs={4}>
                    <img
                        className={classes.image}
                        alt={'alt'}
                        src={`${process.env.REACT_APP_PLACE_API_BASE_URL}/place/product/image?id=${id}`}
                    />
                </Grid>
                <Grid className={classes.content} item xs={8}>
                    <Typography
                        className={classes.title}
                        variant={'h5'}
                        gutterBottom
                    >
                        {title}
                    </Typography>
                    <div className={classes.description}>
                        <span>{description}</span>
                    </div>
                    <div
                        className={classes.description}
                        style={{ justifyContent: 'flex-end' }}
                    >
                        <Typography variant={'h4'} style={{ color: '#ff7043' }}>
                            {`Price ${price}`}
                        </Typography>
                    </div>
                    {handleChange && (
                        <Checkbox
                            className={classes.checkbox}
                            checked={checked}
                            onChange={handleChange}
                            size={'medium'}
                            color={'primary'}
                            value="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    )}
                    {onDelete && (
                        <IconButton
                            className={classes.delete}
                            onClick={onDelete}
                        >
                            <DeleteIcon color="primary" />
                        </IconButton>
                    )}
                </Grid>
            </Grid>
        </Card>
    );
}
