import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { signOut } from '../../store';

export default function SignOutButton({ className }) {
    const dispatch = useDispatch();
    const onSignOut = useCallback(() => {
        dispatch(signOut());
    }, [dispatch]);

    return (
        <Button
            variant="contained"
            color="primary"
            className={className}
            onClick={onSignOut}
        >
            Sign out
        </Button>
    );
}
