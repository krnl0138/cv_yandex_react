import { TOKEN_REFRESH_POST_URL } from './api-urls';
import { setCookie, getCookie } from './cookies';
import { TRequestOptions } from '../types/types';

export const checkResponse = (res: Response): Promise<any> => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
}

export const refreshToken = async (): Promise<void> => {
    const token = localStorage.getItem('refreshToken');

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token }),
    }

    // console.log('PROCEED TO REFRESH_TOKEN');

    try {
        const res = await fetch(TOKEN_REFRESH_POST_URL, options);
        const data = await checkResponse(res);
        setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', data.refreshToken);
    } catch (e) {
        console.log(e);
    }
}

export const fetchWithRefresh = async (url: string, options: TRequestOptions): Promise<any> => {
    const opts = {
        method: options.method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('accessToken')
        }
    }
    
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    }
    catch (err) {
        try {
            await refreshToken();
            // console.log('token has been refreshed');
            const res = await fetch(url, opts);
            return await checkResponse(res);
        }
        catch(e) {
            console.log(e);
        }
    }
}