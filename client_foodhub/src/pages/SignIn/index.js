import React from 'react';
import { useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import SnackBar from '../../components/SnackBar';
import SignInForm from '../../components/SignInForm';

import {
    selectIsUserDataLoading,
    selectIsUserErrorExist,
    selectUserDataErrorMessage,
} from '../../store';
import { useRedirectWhenAuthorized } from '../../hooks';

export default function SignIn() {
    const isLoading = useSelector(selectIsUserDataLoading);
    const isError = useSelector(selectIsUserErrorExist);
    const errorMessage = useSelector(selectUserDataErrorMessage);
    useRedirectWhenAuthorized();

    return isLoading ? (
        <Loading />
    ) : (
        <>
            <SnackBar
                hidden={!isError}
                variant="error"
                message={errorMessage}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            />
            <SignInForm />
        </>
    );
}
