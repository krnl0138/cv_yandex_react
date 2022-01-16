import { checkResponse, fetchWithRefresh } from '../../utils/helpers';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookies';
import {
    REGISTER_POST_URL, LOGIN_POST_URL, LOGOUT_POST_URL,
    GET_USER_DATA_URL, PATCH_USER_DATA_URL, PASSWORD_FORGET_POST_URL, PASSWORD_RESET_POST_URL
} from '../../utils/api-urls';

const otherReqOpt = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
};

export function login({ email, password }) {
    return async function (dispatch) {
        dispatch({ type: 'LOGIN_REQUEST' })

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password }),
            headers: { 'Content-Type': 'application/json' },
            ...otherReqOpt
        }

        console.log('proceed to LOGIN');
        await fetch(LOGIN_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
                localStorage.setItem('refreshToken', data.refreshToken);
                dispatch({ type: 'USER_SET_CREDENTIALS', user: data.user });
                dispatch({ type: 'LOGIN_SUCCESS' });
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: 'LOGIN_FAILED' })
            });

    }
}

export function register({ username, email, password }) {
    return async function (dispatch) {
        dispatch({ type: 'REGISTER_REQUEST' });

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ name: username, email: email, password: password }),
            headers: { 'Content-Type': 'application/json' },
            ...otherReqOpt
        }

        console.log('proceed to REGISTRATION');
        await fetch(REGISTER_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
                localStorage.setItem('refreshToken', data.refreshToken);
                dispatch({ type: 'USER_SET_CREDENTIALS', user: data.user });
                dispatch({ type: 'REGISTER_SUCCESS' });
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: 'REGISTER_FAILED' })
            });
    }
}

export function logout() {
    return async function (dispatch) {
        dispatch({ type: 'LOGOUT_REQUEST' });

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
            headers: { 'Content-Type': 'application/json' },
            ...otherReqOpt
        };

        console.log('proceed to LOGOUT');
        await fetch(LOGOUT_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                dispatch({ type: 'USER_LOGOUT' });
                deleteCookie('accessToken');
                localStorage.removeItem('refreshToken');
                console.log(localStorage.getItem('refreshToken'));
                dispatch({ type: 'LOGOUT_SUCCESS' })
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: 'LOGOUT_FAILED' })
            }
            );
    }
}

export function getUserData() {
    console.log('token IS: ')
    console.log(localStorage.getItem('refreshToken'))
    return async function (dispatch) {
        dispatch({ type: 'GET_USER_DATA_REQUEST' });

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            ...otherReqOpt
        };
        console.log(requestOptions);

        console.log('proceed to GET user info');
        await fetchWithRefresh(GET_USER_DATA_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            }
        })
            .then(data => {
                console.log(data);
                dispatch({ type: 'USER_SET_CREDENTIALS', user: data.user });
                dispatch({ type: 'GET_USER_DATA_SUCCESS' });
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: 'GET_USER_DATA_FAILED' });
            })
    }
}

export function patchUserData({ email, username, password }) {
    return async function (dispatch) {
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify({ name: username, email: email, password: password }),
            ...otherReqOpt
        }

        console.log('proceed to PATCH user info');
        await fetchWithRefresh(PATCH_USER_DATA_URL, requestOptions)
            .then(data => {
                console.log(`response is successful`)
                dispatch({ type: 'PATCH_USER_DATA_SUCCESS', user: data.user });
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: 'PATCH_USER_DATA_FAILED' });
            }
            );
    }
}

export function forgotPassword({ email }) {
    return async function (dispatch) {
        dispatch({ type: 'FORGOT_PASSWORD_REQUEST' })

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email }),
            ...otherReqOpt
        };

        console.log('proceed to password forgot request');
        await fetch(PASSWORD_FORGET_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                console.log(data);
                dispatch({ type: 'FORGOT_PASSWORD_SUCCESS' })

            })
            .catch(e => {
                console.log(e);
                dispatch({ type: 'FORGOT_PASSWORD_FAILED' })
            })
    }
}

export function resetPassword({ password, token }) {
    return async function (dispatch) {
        dispatch({ type: 'RESET_PASSWORD_REQUEST' });
        console.log(PASSWORD_RESET_POST_URL);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: password, token: token }),
            ...otherReqOpt
        }

        console.log('proceed to password reset request');
        await fetch(PASSWORD_RESET_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                console.log(data);
                dispatch({ type: 'RESET_PASSWORD_SUCCESS' });

            })
            .catch(e => {
                console.error(e);
                dispatch({ type: 'RESET_PASSWORD_FAILED' });
            })
    }
}