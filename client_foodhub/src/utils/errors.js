export const ErrorType = {
    SIGN_UP_INVALID_EMAIL: 'SIGN_UP_INVALID_EMAIL',
    SIGN_UP_DUPLICATED_EMAIL: 'SIGN_UP_DUPLICATED_EMAIL',
    SIGN_IN_INVALID_CREDENTIALS: 'SIGN_IN_INCORRECT_CREDENTIALS',
    SIGN_IN_UNKNOWN_USER: 'SIGN_IN_UNKNOWN_USER',
    CHANGE_USER_ROLE_INVALID_ROLE: 'CHANGE_USER_ROLE_INVALID_ROLE',
    CHANGE_USRE_ROLE_USER_NOT_FOUND: 'CHANGE_USRE_ROLE_USER_NOT_FOUND',
    INVALID_DATA_PROVIDED: 'INVALID_DATA_PROVIDED',
    SESSION_EXPIRED: 'SESSION_EXPIRED',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

export const getErrorTypeByError = error => {
    if (!error || typeof error.message !== 'string')
        return ErrorType.UNKNOWN_ERROR;
    switch (error.message.trim()) {
        case 'Invalid email!':
            return ErrorType.SIGN_UP_INVALID_EMAIL;
        case 'User with current email already exists!':
            return ErrorType.SIGN_UP_DUPLICATED_EMAIL;
        case 'Invalid password!':
        case 'Invalid login!':
            return ErrorType.SIGN_IN_INVALID_CREDENTIALS;
        case 'Invalid token!':
        case 'Missing token!':
            return ErrorType.SESSION_EXPIRED;
        case 'Forbidden. Invalid token!':
        case 'Forbidden. Missing token!':
            return ErrorType.INVALID_DATA_PROVIDED;
        case 'User does not exist!':
            return ErrorType.SIGN_IN_UNKNOWN_USER;
        case 'Invalid user role!':
            return ErrorType.CHANGE_USER_ROLE_INVALID_ROLE;
        case 'User for update not found!':
            return ErrorType.CHANGE_USRE_ROLE_USER_NOT_FOUND;
        default:
            return ErrorType.UNKNOWN_ERROR;
    }
};

export const getErrorMessageByType = errorType => {
    switch (errorType) {
        case ErrorType.SIGN_IN_INVALID_CREDENTIALS:
            return 'Incorrect credentials. Please, try again.';
        case ErrorType.SESSION_EXPIRED:
            return 'Session expired. Please try to sign in again.';
        case ErrorType.SIGN_IN_UNKNOWN_USER:
            return 'User with provided email does not exist. Please, try to sign in using another email.';
        case ErrorType.SIGN_UP_INVALID_EMAIL:
            return 'Format of provided email is invalid. Please, enter valid email.';
        case ErrorType.SIGN_UP_DUPLICATED_EMAIL:
            return 'User with provided email already exists. Please, try to sign in or use another email.';
        default:
            return 'Error. Please, try again.';
    }
};
