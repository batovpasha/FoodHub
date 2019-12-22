export const ErrorType = {
    SIGN_UP_INVALID_EMAIL: 'SIGN_UP_INVALID_EMAIL',
    SIGN_UP_DUPLICATED_EMAIL: 'SIGN_UP_DUPLICATED_EMAIL',
    SIGN_IN_INVALID_CREDENTIALS: 'SIGN_IN_INCORRECT_CREDENTIALS',
    SIGN_IN_UNKNOWN_USER: 'SIGN_IN_UNKNOWN_USER',
    INVALID_DATA_PROVIDED: 'INVALID_DATA_PROVIDED',
    SESSION_EXPIRED: 'SESSION_EXPIRED',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR'
}

export const getErrorTypeByError = error => {
    if (!error || typeof error.message !== 'string') return ErrorType.UNKNOWN_ERROR;
    switch(error.message.trim()) {
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
        default:
            return ErrorType.UNKNOWN_ERROR;
    }
}

