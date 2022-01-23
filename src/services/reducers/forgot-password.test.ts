import { forgotPasswordReducer as reducer } from './forgot-password';
import { PASSWORD_FORGOT, PASSWORD_FORGOT_RESTORE } from '../actions/forgot-password';

describe('', () => {
  const initialState = {
    isPasswordForgotten: false,
  };

  it('should return initial state', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should set boolean isPasswordForgotten to true', () => {
    expect(
      reducer(initialState, {
        type: PASSWORD_FORGOT,
      })
    ).toEqual({
      isPasswordForgotten: true,
    });
  });

  it('should set boolean isPasswordForgotten to false', () => {
    expect(
      reducer(initialState, {
        type: PASSWORD_FORGOT_RESTORE,
      })
    ).toEqual({
      isPasswordForgotten: false,
    });
  });
});
