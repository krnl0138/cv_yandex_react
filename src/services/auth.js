import { createContext, useContext, useState } from 'react';
import { checkResponse, fetchWithRefresh } from '../utils/helpers';
import { setCookie, getCookie, deleteCookie } from '../utils/cookies';
import { REGISTER_POST_URL, LOGIN_POST_URL, LOGOUT_POST_URL, GET_USER_DATA_URL, PATCH_USER_DATA_URL, PASSWORD_FORGET_POST_URL, PASSWORD_RESET_POST_URL } from '../utils/api-urls';

const AuthContext = createContext(undefined);

export function useAuth() {
    return useContext(AuthContext);
}

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useProvideAuth() {
    const [user, setUser] = useState(null);

    const register = async ({ username, email, password }) => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ name: username, email: email, password: password })
        }

        console.log('proceed to REGISTRATION');
        await fetch(REGISTER_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
                localStorage.setItem('refreshToken', data.refreshToken);
                setUser(prev => ({ ...prev, user: data.user }));
            })
            .catch(e => {
                console.error(e);
            });
    }

    const login = async ({ email, password }) => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ email: email, password: password })
        }

        console.log('proceed to LOGIN');
        await fetch(LOGIN_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
                localStorage.setItem('refreshToken', data.refreshToken);
                setUser(prev => ({ ...prev, user: data.user }));
            })
            .catch(e => {
                console.error(e);
            });
    }

    const logout = async () => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
        };

        console.log('proceed to LOGOUT');
        await fetch(LOGOUT_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                console.log(data.message);
                setUser(null);
                deleteCookie('accessToken');
                localStorage.removeItem('refreshToken');
                console.log('user after logout ');
                console.log(user);
            })
            .catch(e => {
                console.error(e);
            }
            );
    }

    const getUserData = async () => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        };

        console.log('proceed to GET user info');
        await fetchWithRefresh(GET_USER_DATA_URL, requestOptions)
            .then(data => {
                console.log(data);
                setUser(prev => ({ ...prev, user: data.user }));
            })
            .catch(e => {
                console.error(e);
            })
    }

    const patchUserData = async ({ email, username, password }) => {
        const requestOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify({ name: username, email: email, password: password })
        }

        console.log('proceed to PATCH user info');
        await fetch(PATCH_USER_DATA_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                console.log(`response is successful`)
                setUser(prev => ({ ...prev, user: data.user }));
            })
            .catch(e => {
                console.error(e);
            }
            );
    }

    const forgotPassword = async ({ email }) => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ email: email })
        };

        console.log('proceed to password forgot request');
        await fetch(PASSWORD_FORGET_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const resetPassword = async ({ password, token }) => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ password: password, token: token })
        }

        console.log('proceed to password reset request');
        await fetch(PASSWORD_RESET_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                console.log(data);
            })
            .catch(e => {
                console.error(e);
            })
    }

    return {
        user,
        register,
        login,
        logout,
        getUserData,
        patchUserData,
        forgotPassword,
        resetPassword
    };
}
