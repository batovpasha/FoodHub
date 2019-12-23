import Auth from '../auth';
import FetchFactory from '../fetch';

export default class UserService {
    static auth = Auth;

    fetch = FetchFactory(`${process.env.REACT_APP_USER_API_BASE_URL}/user`);
    authFetch = FetchFactory(`${process.env.REACT_APP_AUTH_API_BASE_URL}/auth`);

    signUp = async user => {
        const response = await this.authFetch.post('/signUp', user, {
            auth: false,
        });
        if (response.ok) {
            const { email, password } = user;
            return this.signIn(email, password);
        } else {
            return this.handleInvalidResponse(response);
        }
    };

    signIn = async (email, password) => {
        const response = await this.authFetch.post(
            '/signIn',
            { email, password },
            { auth: false }
        );
        if (response.ok) {
            const { token } = await response.json();
            UserService.auth.writeToken(token);
            return this.loadUser();
        } else {
            return this.handleInvalidResponse(response);
        }
    };

    loadUser = async () => {
        const response = await this.fetch.get('/me');
        if (response.ok) {
            const {
                first_name: firstName,
                last_name: lastName,
                ...rest
            } = await response.json();
            return { firstName, lastName, ...rest };
        } else {
            return this.handleInvalidResponse(response);
        }
    };

    signOut = () => UserService.auth.resetToken();

    changeUserRole = async role => {
        const response = await this.fetch.put('/changeRole', { role });
        if (!response.ok) {
            return this.handleInvalidResponse(response);
        }
    };

    changePassword = async (oldPassword, newPassword) => {
        const response = await this.authFetch.post('/changePassword', {
            oldPassword,
            newPassword,
        });
        if (!response.ok) {
            return this.handleInvalidResponse(response);
        }
    };

    handleInvalidResponse = async response => {
        const payload = await response.json();
        if (payload && payload.error) {
            throw new Error(payload.error);
        } else {
            throw new Error('Invalid response!');
        }
    };
}
