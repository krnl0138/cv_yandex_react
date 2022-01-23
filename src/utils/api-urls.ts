import { getCookie } from './cookies';

const HTTPS_API_URL = 'https://norma.nomoreparties.space/api';
const WS_API_URL = 'wss://norma.nomoreparties.space/orders';

export const REGISTER_POST_URL = HTTPS_API_URL + '/auth/register'; //POST
export const LOGIN_POST_URL = HTTPS_API_URL + '/auth/login'; //POST
export const LOGOUT_POST_URL = HTTPS_API_URL + '/auth/logout'; //POST
export const TOKEN_REFRESH_POST_URL = HTTPS_API_URL + '/auth/token'; //POST
export const GET_USER_DATA_URL = HTTPS_API_URL + '/auth/user'; //GET - эндпоинт получения данных о пользователе.
export const PATCH_USER_DATA_URL = HTTPS_API_URL + '/auth/user'; //PATCH - эндпоинт обновления данных о пользователе.
export const PASSWORD_FORGET_POST_URL = HTTPS_API_URL + '/password-reset'; // POST
export const PASSWORD_RESET_POST_URL = HTTPS_API_URL + '/password-reset'; // POST

export const GET_INGREDIENTS_URL = HTTPS_API_URL + '/ingredients';
export const POST_ORDER_URL = HTTPS_API_URL + '/orders';
export const GET_ORDER_URL = HTTPS_API_URL + '/orders';

export const WS_ALL_ORDERS_URL = WS_API_URL + '/all';
export const WS_USER_ORDERS_URL = WS_API_URL + '?token=' + getCookie('accessToken');
