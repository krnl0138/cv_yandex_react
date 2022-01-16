import { TFormData } from "../../../types/types";
import { LOGIN_POST_URL } from "../../../utils/api-urls";
import { setCookie } from "../../../utils/cookies";
import { checkResponse } from "../../../utils/helpers";
import { AppThunk, AppDispatch } from "../../reducers";
import { USER_SET_CREDENTIALS } from "../user";

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS: 'LOGIN_REQUEST_SUCCESS' = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED: 'LOGIN_REQUEST_FAILED' = 'LOGIN_REQUEST_FAILED';

interface ILoginRequest {
    readonly type: typeof LOGIN_REQUEST;
}
interface ILoginRequestSuccess {
    readonly type: typeof LOGIN_REQUEST_SUCCESS;
}
interface ILoginRequestFailed {
    readonly type: typeof LOGIN_REQUEST_FAILED;
}

export type TLoginActions = ILoginRequest | ILoginRequestSuccess | ILoginRequestFailed;

export const login: AppThunk = ({ email, password }: TFormData) =>
    async (dispatch: AppDispatch) => {
        dispatch({ type: LOGIN_REQUEST })

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password }),
            headers: { 'Content-Type': 'application/json' }
        }

        console.log('proceed to LOGIN');
        await fetch(LOGIN_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
                localStorage.setItem('refreshToken', data.refreshToken);
                dispatch({ type: USER_SET_CREDENTIALS, user: data.user });
                dispatch({ type: LOGIN_REQUEST_SUCCESS });
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: LOGIN_REQUEST_FAILED })
            });

    }