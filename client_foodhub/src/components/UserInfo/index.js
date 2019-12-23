import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../store/selectors/user';

const useStyles = makeStyles(theme => ({
    caption: {
        margin: theme.spacing(5),
    },
    list: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        backgroundColor: theme.palette.grey[100],
    },
}));

export default function UserInfo({ caption = 'User Info' }) {
    const classes = useStyles();

    const { firstName, lastName, email } = useSelector(selectUserData);

    return (
        <div>
            <Typography className={classes.caption} variant="h2">
                {caption}
            </Typography>
            <List className={classes.list}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Fist name: ${firstName}`} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <SupervisorAccountIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Last name: ${lastName}`} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ContactMailIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Email: ${email}`} />
                </ListItem>
            </List>
        </div>
    );
}
