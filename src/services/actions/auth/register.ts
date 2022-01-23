import { AppThunk, AppDispatch } from '../../reducers';
import { setCookie } from '../../../utils/cookies';
import { checkResponse } from '../../../utils/helpers';
import { TFormData } from '../../../types/types';
import { REGISTER_POST_URL } from '../../../utils/api-urls';
import { setUserCredentials } from '../user';

export const REGISTER_REQUEST = 'REGISTER_REQUEST' as const;
export const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS' as const;
export const REGISTER_REQUEST_FAILED = 'REGISTER_REQUEST_FAILED' as const;

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

export const register: AppThunk =
  ({ username, email, password }: TFormData) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ name: username, email: email, password: password }),
      headers: { 'Content-Type': 'application/json' },
    };

    // console.log('proceed to REGISTRATION');
    try {
      const res = await fetch(REGISTER_POST_URL, requestOptions);
      const data = await checkResponse(res);
      setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
      localStorage.setItem('refreshToken', data.refreshToken);
      dispatch(setUserCredentials(data.user));
      dispatch({ type: REGISTER_REQUEST_SUCCESS });
    } catch (e) {
      console.error(e);
      dispatch({ type: REGISTER_REQUEST_FAILED });
    }
  };
