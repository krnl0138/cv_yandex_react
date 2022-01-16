import { TOKEN_REFRESH_POST_URL } from './api-urls';
import { setCookie, getCookie, deleteCookie } from './cookies';

export const checkResponse = res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
}

export const refreshToken = async () => {
    console.log(getCookie('accessToken'));
    const token = localStorage.getItem('refreshToken');
    console.log('token is: ' + token);

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token }),
    }

    console.log('PROCEED TO REFRESH_TOKEN');

    try {
        const res = await fetch(TOKEN_REFRESH_POST_URL, options);
        const data = await checkResponse(res);
        console.log(data);
        setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', data.refreshToken);
    } catch (e) {
        console.log(e);
    }
}

export const fetchWithRefresh = async (url, options) => {
    console.log('start fetch with refresh')
    console.log(options);
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    }
    catch (err) {
        await refreshToken();
        console.log('after refresh token')
        const res = await fetch(url, {
            method: options.method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            }
        });
        return await checkResponse(res);
    }
}