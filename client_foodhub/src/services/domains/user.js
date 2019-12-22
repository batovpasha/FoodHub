import Auth from '../auth';
import FetchFactory from '../fetch';

export default class UserService {
    static auth = Auth;

    fetch = FetchFactory(process.env.REACT_APP_API_BASE_URL);

    signUp = async user => {
        const response = await this.fetch.post('/auth/signUp', user, { auth: false });
        if (response.ok) {
            const { email, password } = user;
            return this.signIn(email, password);
        } else {
            return this.handleInvalidResponse(response);
        }
    };

    signIn = async (email, password) => {
        const response = await this.fetch.post('/auth/signIn', { email, password }, { auth: false });
        if (response.ok) {
            const { token } = await response.json();
            UserService.auth.writeToken(token);
            return this.loadUser();
        } else {
            return this.handleInvalidResponse(response);
        }
    };

    loadUser = async () => {
        const response = await this.fetch.get('/auth/tokenInfo');
        if (response.ok) {
            const { id } = await response.json();
            return this.getUserById(id);
        } else {
            return this.handleInvalidResponse(response);
        }
    };

    getUserById = async id => {
        const response = await this.fetch.get(`/user/${id}`);
        if (response.ok) {
            return response.json();
        } else {
            return this.handleInvalidResponse(response);
        }
    }

    signOut = () => UserService.auth.resetToken();

    handleInvalidResponse = async response => {
        const payload = await response.json();
        if (payload && payload.error) {
            throw new Error(payload.error);
        } else {
            throw new Error('Invalid response!');
        }
    };
}
