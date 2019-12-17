import React from 'react';
import {useSelector} from 'react-redux';

import Loading from '../../components/Loading';
import SignInForm from '../../components/SignInForm';

import {selectIsUserDataLoading} from '../../store';
import {useRedirectWhenAuthorized} from '../../hooks';

export default function SignIn() {
    const isLoading = useSelector(selectIsUserDataLoading);
    useRedirectWhenAuthorized();

    return isLoading ? (
        <Loading />
    ) : (
        <SignInForm />
    );
}
