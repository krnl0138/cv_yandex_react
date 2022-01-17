import { AppThunk, AppDispatch } from "../../reducers";
import { TFormData } from "../../../types/types";
import { GET_USER_DATA_URL, PATCH_USER_DATA_URL } from "../../../utils/api-urls";
import { getCookie } from "../../../utils/cookies";
import { fetchWithRefresh } from "../../../utils/helpers";
import { setUserCredentials } from "../user";

export const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST' as const;
export const GET_USER_DATA_REQUEST_SUCCESS = 'GET_USER_DATA_REQUEST_SUCCESS' as const;
export const GET_USER_DATA_REQUEST_FAILED = 'GET_USER_DATA_REQUEST_FAILED' as const;

export const PATCH_USER_DATA_REQUEST = 'PATCH_USER_DATA_REQUEST' as const;
export const PATCH_USER_DATA_REQUEST_SUCCESS = 'PATCH_USER_DATA_REQUEST_SUCCESS' as const;
export const PATCH_USER_DATA_REQUEST_FAILED = 'PATCH_USER_DATA_REQUEST_FAILED' as const;

interface IGetUserDataRequest {
    readonly type: typeof GET_USER_DATA_REQUEST;
}
interface IGetUserDataRequestSuccess {
    readonly type: typeof GET_USER_DATA_REQUEST_SUCCESS;
}
interface IGetUserDataRequestFailed {
    readonly type: typeof GET_USER_DATA_REQUEST_FAILED;
}

interface IPatchUserDataRequest {
    readonly type: typeof PATCH_USER_DATA_REQUEST;
}
interface IPatchUserDataRequestSuccess {
    readonly type: typeof PATCH_USER_DATA_REQUEST_SUCCESS;
}
interface IPatchUserDataRequestFailed {
    readonly type: typeof PATCH_USER_DATA_REQUEST_FAILED;
}

export type TUserDataActions = IGetUserDataRequest | IGetUserDataRequestSuccess | IGetUserDataRequestFailed | IPatchUserDataRequest | IPatchUserDataRequestSuccess | IPatchUserDataRequestFailed;

export const getUserData: AppThunk = () =>
    async (dispatch: AppDispatch) => {
        dispatch({ type: GET_USER_DATA_REQUEST });

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
        };

        // console.log('proceed to GET user info');
        try {
            const data = await fetchWithRefresh(GET_USER_DATA_URL, requestOptions);
            if (data) {
                dispatch(setUserCredentials(data.user));
                dispatch({ type: GET_USER_DATA_REQUEST_SUCCESS });
            }
        }
        catch (e) {
            dispatch({ type: GET_USER_DATA_REQUEST_FAILED });
            console.error(e);
        }
    }

export const patchUserData: AppThunk = ({ email, username, password }: TFormData) =>
    async (dispatch: AppDispatch) => {
        dispatch({ type: PATCH_USER_DATA_REQUEST });

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify({ name: username, email: email, password: password })
        }

        // console.log('proceed to PATCH user info');
        try {
            const data = await fetchWithRefresh(PATCH_USER_DATA_URL, requestOptions);
            if (data) {
                dispatch({ type: PATCH_USER_DATA_REQUEST_SUCCESS, user: data.user });
            }
        }
        catch (e) {
            console.error(e);
            dispatch({ type: PATCH_USER_DATA_REQUEST_FAILED });
        }
    }