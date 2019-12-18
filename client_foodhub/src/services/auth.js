export class AuthService {
    static storageKey = 'food-hub-client';

    constructor() {
        const { token, error } = this.readToken();
        if (token && !error) {
            this.token = token;
        }
    }

    resetToken = token => {
        this.token = token;
        this.writeToken(token);
    }

    getStorageData = () => JSON.parse(localStorage.getItem(AuthService.storageKey));

    setStorageData = data => localStorage.setItem(AuthService.storageKey, JSON.stringify(data))

    readToken = () => {
        try {
            const data = this.getStorageData();
            if (this.isStorageDataValid(data)) {
                return { ...data, error: null };
            } else {
                return { error: new Error('Invalid token') };
            }
        } catch (error) {
            return { error };
        }
    };

    writeToken = token => {
        try {
            const data = this.getStorageData();
            this.setStorageData({ ...data, token });
            return { error: null };
        } catch (error) {
            return { error }
        }
    }

    isStorageDataValid = data => (
        data && typeof data === 'object' &&
        'token' in data && typeof data.token === 'string'
    );
}
