import Auth from '../auth';

export default class UserService {
    static auth = Auth;
    static baseUrl = process.env.REACT_APP_API_BASE_URL;

    signUp = async user => {
        const response = await fetch(`${UserService.baseUrl}/auth/signUp`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: new Headers({'Content-Type': 'application/json'})
        });
        if (response.ok) {
            const { email, password } = user;
            return this.signIn(email, password);
        } else {
            const payload = await response.json();
            if (payload && payload.error) {
                throw new Error(payload.error);
            } else {
                throw new Error('Invalid response!');
            }
        }
    };

    signIn = async (email, password) => {
        const response = await fetch(`${UserService.baseUrl}/auth/signIn`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: new Headers({'Content-Type': 'application/json'})
        });
        if (response.ok) {
            const { token } = await response.json();
            UserService.auth.writeToken(token);
            return this.loadUser();
        } else {
            const payload = await response.json();
            if (payload && payload.error) {
                throw new Error(payload.error);
            } else {
                throw new Error('Invalid response!');
            }
        }
    };

    loadUser = async () => {
        const response = await fetch(`${UserService.baseUrl}/auth/tokenInfo`, {
            headers: new Headers(UserService.auth.getAuthHeader())
        });
        if (response.ok) {
            const { id } = await response.json();
            return this.getUserById(id);
        } else {
            const payload = await response.json();
            if (payload && payload.error) {
                throw new Error(payload.error);
            } else {
                throw new Error('Invalid response!');
            }
        }
    };

    getUserById = async id => {
        const response = await fetch(`${UserService.baseUrl}/user/${id}`, {
            method: 'GET',
            headers: new Headers(UserService.auth.getAuthHeader())
        });
        if (response.ok) {
            return response.json();
        } else {
            const payload = await response.json();
            if (payload && payload.error) {
                throw new Error(payload.error);
            } else {
                throw new Error('Invalid response!');
            }
        }
    }

    signOut = () => UserService.auth.resetToken();
}
