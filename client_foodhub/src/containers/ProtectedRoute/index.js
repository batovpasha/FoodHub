import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '../../store';

export default function ProtectedRoute({ component: Component, ...rest }) {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return (
        <Route
            {...rest}
            render={props => (
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: '/signIn',
                        state: { from: props.location }
                    }} />
                )
            )}
        />
    );
}
