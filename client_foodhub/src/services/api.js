export class FakeUserApiService {
    constructor(auth) {
        this.auth = auth;
    }

    postUser = user => new Promise((resolve, reject) => {
        try {
            const token = new Date().toISOString();
            const { error } = this.auth.writeToken(token);
            if (error) throw error;

            const data = JSON.parse(localStorage.getItem('food-hub-client'));
            localStorage.setItem('food-hub-client', JSON.stringify({ ...data, user }));

            resolve(user);
        } catch (error) {
            reject(error);
        }
    });

    getUser = () => new Promise((resolve, reject) => {
        try {
            const { user: { login, password, ...user } } = JSON.parse(
                localStorage.getItem('food-hub-client')
            );
            if (user) {
                resolve(user);
            } else {
                reject(new Error('Invalid token'));
            }
        } catch (error) {
            reject(error)
        }
    });

    login = (userLogin, userPassword) => new Promise((resolve, reject) => {
        try {
            const { user: { login, password, ...user } } = JSON.parse(
                localStorage.getItem('food-hub-client')
            );
            if (login === userLogin && password === userPassword && user) {
                const token = new Date().toISOString();
                const { error } = this.auth.writeToken(token);
                if (error) throw error;

                resolve(user);
            } else {
                reject(new Error('Invalid token'));
            }
        } catch (error) {
            reject(error)
        }
    });
}
