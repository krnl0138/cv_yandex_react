import { TOKEN_REFRESH_POST_URL } from './api-urls';
import { setCookie } from './cookies';

export const checkResponse = res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
}

export const refreshToken = () => {
    console.log('proceed to refresh token request')

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset-utf-8' },
        body: JSON.stringify({ token: localStorage.getItem(refreshToken)})
    }

    fetch(TOKEN_REFRESH_POST_URL, options)
        .then(res => checkResponse(res))
        .then(data => {
            console.log('token was successfully updated');
            setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
            localStorage.setItem('refreshToken', data.refreshToken);
        });
}

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    }
    catch (err) {
        console.log('GETTING NEW ACCESS TOKEN');
        if (err.message === 'jwt expired') {
            refreshToken();
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
}