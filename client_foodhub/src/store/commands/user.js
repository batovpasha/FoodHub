import {
    signInStart,
    signInFailure,
    signInSuccess,
    signUpStart,
    signUpFailure,
    signUpSuccess,
    signOutSuccess
} from "../actions"

export const signIn = ({ login, password }, redirect) => async (dispatch, _getState, { api }) => {
    dispatch(signInStart());
    try {
        const user = await api.login(login, password);
        dispatch(signInSuccess(user));
        redirect && redirect();
    } catch (error) {
        dispatch(signInFailure(error));
    }
}

export const signUp = (userData, redirect) => async (dispatch, _getState, { api }) => {
    dispatch(signUpStart());
    try {
        const user = await api.postUser(userData);
        dispatch(signUpSuccess(user));
        redirect && redirect();
    } catch (error) {
        dispatch(signUpFailure(error));
    }
}

export const signOut = () => async (dispatch, _getState, { api }) => {
    api.auth.resetToken();
    dispatch(signOutSuccess());
}
