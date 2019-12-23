import { createActions } from 'redux-actions';

export const { signInStart, signInSuccess, signInFailure } = createActions({
    SIGN_IN_START: () => ({}),
    SIGN_IN_SUCCESS: user => ({ user }),
    SIGN_IN_FAILURE: error => ({ error }),
});

export const { signUpStart, signUpSuccess, signUpFailure } = createActions({
    SIGN_UP_START: () => ({}),
    SIGN_UP_SUCCESS: user => ({ user }),
    SIGN_UP_FAILURE: error => ({ error }),
});

export const { signOutSuccess } = createActions({
    SIGN_OUT_SUCCESS: () => ({}),
});

export const {
    changeUserRoleStart,
    changeUserRoleSuccess,
    changeUserRoleFailure,
} = createActions({
    CHANGE_USER_ROLE_START: () => ({}),
    CHANGE_USER_ROLE_SUCCESS: role => ({ role }),
    CHANGE_USER_ROLE_FAILURE: error => ({ error }),
});

export const {
    changePasswordStart,
    changePasswordSuccess,
    changePasswordFailure,
} = createActions({
    CHANGE_PASSWORD_START: () => ({}),
    CHANGE_PASSWORD_SUCCESS: () => ({}),
    CHANGE_PASSWORD_FAILURE: error => ({ error }),
});
