import { AppThunk, AppDispatch } from "../../reducers";
import { setCookie } from "../../../utils/cookies";
import { checkResponse } from "../../../utils/helpers";
import { TFormData } from "../../../types/types";
import { REGISTER_POST_URL } from "../../../utils/api-urls";
import { USER_SET_CREDENTIALS } from "../user";

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_REQUEST_SUCCESS: 'REGISTER_REQUEST_SUCCESS' = 'REGISTER_REQUEST_SUCCESS';
export const REGISTER_REQUEST_FAILED: 'REGISTER_REQUEST_FAILED' = 'REGISTER_REQUEST_FAILED';

interface IRegisterRequest {
    readonly type: typeof REGISTER_REQUEST;
}
interface IRegisterRequestSuccess {
    readonly type: typeof REGISTER_REQUEST_SUCCESS;
}
interface IRegisterRequestFailed {
    readonly type: typeof REGISTER_REQUEST_FAILED;
}

export type TRegisterActions = IRegisterRequest | IRegisterRequestSuccess | IRegisterRequestFailed;

export const register: AppThunk = ({ username, email, password }: TFormData) =>
    async (dispatch: AppDispatch) => {
        dispatch({ type: REGISTER_REQUEST });

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ name: username, email: email, password: password }),
            headers: { 'Content-Type': 'application/json' }
        }

        console.log('proceed to REGISTRATION');
        await fetch(REGISTER_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
                localStorage.setItem('refreshToken', data.refreshToken);
                dispatch({ type: USER_SET_CREDENTIALS, user: data.user });
                dispatch({ type: REGISTER_REQUEST_SUCCESS });
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: REGISTER_REQUEST_FAILED })
            });
    }