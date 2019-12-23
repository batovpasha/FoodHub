import { showNotification } from './notifications';
import {
    signInStart,
    signInFailure,
    signInSuccess,
    signUpStart,
    signUpFailure,
    signUpSuccess,
    signOutSuccess,
    changeUserRoleStart,
    changeUserRoleSuccess,
    changeUserRoleFailure,
    changePasswordStart,
    changePasswordFailure,
    changePasswordSuccess,
} from '../actions';
import {
    getErrorTypeByError,
    NotificationTypes,
    getErrorMessageByType,
} from '../../utils';

export const signIn = ({ login, password }, redirect) => async (
    dispatch,
    _getState,
    { userAPI }
) => {
    dispatch(signInStart());
    try {
        const user = await userAPI.signIn(login, password);
        dispatch(signInSuccess(user));
        redirect && redirect();
    } catch (error) {
        dispatch(signInFailure({ type: getErrorTypeByError(error) }));
    }
};

export const signUp = (userData, redirect) => async (
    dispatch,
    _getState,
    { userAPI }
) => {
    dispatch(signUpStart());
    try {
        const user = await userAPI.signUp(userData);
        dispatch(signUpSuccess(user));
        redirect && redirect();
    } catch (error) {
        dispatch(signUpFailure({ type: getErrorTypeByError(error) }));
    }
};

export const signOut = () => async (dispatch, _getState, { userAPI }) => {
    userAPI.signOut();
    dispatch(signOutSuccess());
};

export const changeUserRole = (role, redirect) => async (
    dispatch,
    _getState,
    { userAPI }
) => {
    dispatch(changeUserRoleStart());
    try {
        await userAPI.changeUserRole(role);
        dispatch(changeUserRoleSuccess(role));
        redirect && redirect();
        dispatch(
            showNotification(
                NotificationTypes.SUCCESS,
                `User role successfuly changed to ${role}`
            )
        );
    } catch (error) {
        dispatch(changeUserRoleFailure({ type: getErrorTypeByError(error) }));
    }
};

export const changePassword = (oldPassword, newPassword) => async (
    dispatch,
    _getState,
    { userAPI }
) => {
    dispatch(changePasswordStart());
    try {
        await userAPI.changePassword(oldPassword, newPassword);
        dispatch(changePasswordSuccess());
        dispatch(
            showNotification(
                NotificationTypes.SUCCESS,
                'Password successfuly changed!'
            )
        );
    } catch (error) {
        dispatch(changePasswordFailure());
        dispatch(
            showNotification(
                NotificationTypes.ERROR,
                getErrorMessageByType(getErrorTypeByError(error))
            )
        );
    }
};
