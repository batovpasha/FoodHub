import {
    signInStart,
    signInFailure,
    signInSuccess,
    signUpStart,
    signUpFailure,
    signUpSuccess,
    signOutSuccess
} from "../actions"

import {getErrorTypeByError} from "../../utils";

export const signIn = ({ login, password }, redirect) => async (dispatch, _getState, { userAPI }) => {
    dispatch(signInStart());
    try {
        const user = await userAPI.signIn(login, password);
        dispatch(signInSuccess(user));
        redirect && redirect();
    } catch (error) {
        dispatch(signInFailure({ type: getErrorTypeByError(error) }));
    }
}

export const signUp = (userData, redirect) => async (dispatch, _getState, { userAPI }) => {
    dispatch(signUpStart());
    try {
        const user = await userAPI.signUp(userData);
        dispatch(signUpSuccess(user));
        redirect && redirect();
    } catch (error) {
        dispatch(signUpFailure({ type: getErrorTypeByError(error) }));
    }
}

export const signOut = () => async (dispatch, _getState, { userAPI }) => {
    userAPI.signOut();
    dispatch(signOutSuccess());
}
