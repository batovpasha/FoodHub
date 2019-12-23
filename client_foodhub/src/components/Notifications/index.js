import React from 'react';
import { useSelector } from 'react-redux';

import SnackBar from '../SnackBar';
import { selectNotifications } from '../../store';

export default function Notifications() {
    const notification = useSelector(selectNotifications);

    return notification.map(({ id, type, message }) => (
        <SnackBar key={id} variant={type} message={message} />
    ));
}
