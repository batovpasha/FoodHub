export default class UserService {

    postUser = (authService, user) =>
        new Promise((resolve, reject) => {
            try {
                const token = new Date().toISOString();
                const { error } = authService.writeToken(token);
                if (error) throw error;

                const data = JSON.parse(localStorage.getItem('food-hub-client'));
                localStorage.setItem('food-hub-client', JSON.stringify({ ...data, user }));

                setTimeout(() => resolve(user), 500);
            } catch (error) {
                setTimeout(() => reject(error), 500);
            }
        });

    getUser = () =>
        new Promise((resolve, reject) => {
            try {
                const {
                    user: { login, password, ...user },
                } = JSON.parse(localStorage.getItem('food-hub-client'));
                if (user) {
                    setTimeout(() => resolve(user), 500);
                } else {
                    setTimeout(() => reject(new Error('Invalid token')), 500);
                }
            } catch (error) {
                setTimeout(() => reject(error), 500);
            }
        });

    login = (authService, userLogin, userPassword) =>
        new Promise((resolve, reject) => {
            try {
                const {
                    user: { email, password, ...user },
                } = JSON.parse(localStorage.getItem('food-hub-client'));
                if (email === userLogin && password === userPassword && user) {
                    const token = new Date().toISOString();
                    const { error } = authService.writeToken(token);
                    if (error) throw error;

                    setTimeout(() => resolve({ ...user, email }), 500);
                } else {
                    setTimeout(() => reject(new Error('Invalid credentials')), 500);
                }
            } catch (error) {
                setTimeout(() => reject(error), 500);
            }
        });
}
