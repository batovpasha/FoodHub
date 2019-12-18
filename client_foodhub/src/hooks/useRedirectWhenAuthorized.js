import {useEffect, useCallback} from "react";
import {useHistory, useLocation} from "react-router";
import {useSelector} from "react-redux";
import {selectIsAuthenticated} from "../store";

export const useRedirectWhenAuthorized = () => {
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };
    const redirect = useCallback(() => history.replace(from), [history, from]);

    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        isAuthenticated && redirect();
    }, [redirect, isAuthenticated]);
}
