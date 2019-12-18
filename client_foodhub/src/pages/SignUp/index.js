import React from 'react';
import {useSelector} from 'react-redux';

import Loading from '../../components/Loading';
import SignUpForm from '../../components/SignUpForm';

import {selectIsUserDataLoading} from '../../store';
import {useRedirectWhenAuthorized} from '../../hooks';

export default function SignUp() {
    const isLoading = useSelector(selectIsUserDataLoading);
    useRedirectWhenAuthorized();

    return isLoading ? (
        <Loading />
    ) : (
        <SignUpForm />
    );
}
