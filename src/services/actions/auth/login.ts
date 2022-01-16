import { TFormData } from "../../../types/types";
import { LOGIN_POST_URL } from "../../../utils/api-urls";
import { setCookie } from "../../../utils/cookies";
import { checkResponse } from "../../../utils/helpers";
import { AppThunk, AppDispatch } from "../../reducers";
import { setUserCredentials } from "../user";

export const LOGIN_REQUEST = 'LOGIN_REQUEST' as const;
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS' as const;
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED' as const;

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

export const login: AppThunk = ({ email, password }: TFormData) => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: LOGIN_REQUEST })

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password }),
            headers: { 'Content-Type': 'application/json' }
        }

        console.log('proceed to LOGIN');
        try {
            const res = await fetch(LOGIN_POST_URL, requestOptions)
            const data = await checkResponse(res)
            setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
            localStorage.setItem('refreshToken', data.refreshToken);
            dispatch(setUserCredentials(data.user));
            dispatch({ type: LOGIN_REQUEST_SUCCESS });
        }
        catch (e) {
            console.error(e);
            dispatch({ type: LOGIN_REQUEST_FAILED })
        }
    }
}