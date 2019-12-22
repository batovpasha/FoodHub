import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    card: {
        width: 600,
        cursor: 'pointer',
    },
    content: {
        padding: theme.spacing(3),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

export default function ActionCard({ icon, caption, onAction }) {
    const classes = useStyles();

    return (
        <Card className={classes.card} onClick={onAction}>
            <CardContent className={classes.content}>
                {icon}
                <Typography variant="h2" component="h2">
                    {caption}
                </Typography>
            </CardContent>
        </Card>
    );
}
