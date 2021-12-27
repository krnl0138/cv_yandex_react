import { AppDispatch, AppThunk } from "../../reducers";
import { TFormData } from "../../../types/types";
import { checkResponse } from "../../../utils/helpers";
import { PASSWORD_FORGET_POST_URL, PASSWORD_RESET_POST_URL } from "../../../utils/api-urls";

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST' as const;
export const FORGOT_PASSWORD_REQUEST_SUCCESS = 'FORGOT_PASSWORD_REQUEST_SUCCESS' as const;
export const FORGOT_PASSWORD_REQUEST_FAILED = 'FORGOT_PASSWORD_REQUEST_FAILED' as const;

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST' as const;
export const RESET_PASSWORD_REQUEST_SUCCESS = 'RESET_PASSWORD_REQUEST_SUCCESS' as const;
export const RESET_PASSWORD_REQUEST_FAILED = 'RESET_PASSWORD_REQUEST_FAILED' as const;

interface IForgotPasswordRequest {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
interface IForgotPasswordRequestSuccess {
    readonly type: typeof FORGOT_PASSWORD_REQUEST_SUCCESS;
}
interface IForgotPasswordRequestFailed {
    readonly type: typeof FORGOT_PASSWORD_REQUEST_FAILED;
}

interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
interface IResetPasswordRequestSuccess {
    readonly type: typeof RESET_PASSWORD_REQUEST_SUCCESS;
}
interface IResetPasswordRequestFailed {
    readonly type: typeof RESET_PASSWORD_REQUEST_FAILED;
}

export type TPasswordActions = IForgotPasswordRequest | IForgotPasswordRequestSuccess | IForgotPasswordRequestFailed | IResetPasswordRequest | IResetPasswordRequestSuccess | IResetPasswordRequestFailed;

export const forgotPassword: AppThunk = ({ email }: TFormData) =>
    async (dispatch: AppDispatch) => {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        };

        console.log('proceed to password forgot request');
        await fetch(PASSWORD_FORGET_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                console.log(data);
                dispatch({ type: FORGOT_PASSWORD_REQUEST_SUCCESS })

            })
            .catch(e => {
                console.log(e);
                dispatch({ type: FORGOT_PASSWORD_REQUEST_FAILED })
            })
    }

export const resetPassword: AppThunk = ({ password, token }: TFormData) =>
    async (dispatch: AppDispatch) => {
        dispatch({ type: 'RESET_PASSWORD_REQUEST' });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: password, token: token })
        }

        console.log('proceed to password reset request');
        await fetch(PASSWORD_RESET_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                console.log(data);
                dispatch({ type: RESET_PASSWORD_REQUEST_SUCCESS });

            })
            .catch(e => {
                console.error(e);
                dispatch({ type: RESET_PASSWORD_REQUEST_FAILED });
            })
    }