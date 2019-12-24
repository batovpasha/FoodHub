import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated, selectIsUserProducer } from '../../store';
import { routes } from '../../routes';

export default function ProducerProtectedRoute({
    component: Component,
    ...rest
}) {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isProducer = useSelector(selectIsUserProducer);
    return (
        <Route
            {...rest}
            render={props =>
                isProducer && isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: isAuthenticated
                                ? routes.home
                                : routes.signIn,
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
}
