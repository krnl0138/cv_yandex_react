import { AppThunk, AppDispatch } from "../../reducers";
import { LOGOUT_POST_URL } from "../../../utils/api-urls";
import { deleteCookie } from "../../../utils/cookies";
import { checkResponse } from "../../../utils/helpers";
import { USER_LOGOUT } from "../user";

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST' as const;
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS' as const;
export const LOGOUT_REQUEST_FAILED = 'LOGOUT_REQUEST_FAILED' as const;

interface ILogoutRequest {
    readonly type: typeof LOGOUT_REQUEST;
}
interface ILogoutRequestSuccess {
    readonly type: typeof LOGOUT_REQUEST_SUCCESS;
}
interface ILogoutRequestFailed {
    readonly type: typeof LOGOUT_REQUEST_FAILED;
}

export type TLogoutActions = ILogoutRequest | ILogoutRequestSuccess | ILogoutRequestFailed;

export const logout: AppThunk = () =>
    async (dispatch: AppDispatch) => {
        dispatch({ type: LOGOUT_REQUEST });

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
            headers: { 'Content-Type': 'application/json' }
        };

        console.log('proceed to LOGOUT');
        try {
            const res = await fetch(LOGOUT_POST_URL, requestOptions);
            await checkResponse(res);
            dispatch({ type: USER_LOGOUT });
            deleteCookie('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch({ type: LOGOUT_REQUEST_SUCCESS })
        }
        catch (e) {
            console.error(e);
            dispatch({ type: LOGOUT_REQUEST_FAILED })
        }
    }