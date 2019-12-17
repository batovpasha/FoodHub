import React from 'react';
import {useSelector} from 'react-redux';

import Loading from '../../components/Loading';
import ErrorSnackBar from '../../components/ErrorSnackBar';
import SignInForm from '../../components/SignInForm';

import {selectIsUserDataLoading, selectIsUserErrorExist, selectUserDataErrorMessage} from '../../store';
import {useRedirectWhenAuthorized} from '../../hooks';

export default function SignIn() {
    const isLoading = useSelector(selectIsUserDataLoading);
    const isError = useSelector(selectIsUserErrorExist);
    const errorMessage = useSelector(selectUserDataErrorMessage);
    useRedirectWhenAuthorized();

    return isLoading ? (
        <Loading />
    ) : (
        <>
            <ErrorSnackBar
                isError={isError}
                message={errorMessage}
            />
            <SignInForm />
        </>
    );
}
