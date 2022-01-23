import { wsMessageTestExample } from '../../utils/tests-data';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../actions/socket';
import { wsReducer as reducer } from './socket';

describe('user reducer', () => {
  const initialState = {
    wsConnected: false,
    messages: [],
  };

  it('should return initial state', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should close a ws connection', () => {
    expect(
      reducer(initialState, {
        type: WS_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: false,
    });
  });

  it('should indicate a successful ws connection', () => {
    expect(
      reducer(initialState, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: true,
    });
  });

  it('should indicate a failed ws connection', () => {
    const error = {};
    expect(
      reducer(initialState, {
        type: WS_CONNECTION_ERROR,
        payload: error,
      })
    ).toEqual({
      ...initialState,
      error: error,
      wsConnected: false,
    });
  });

  it('should get a ws message', () => {
    expect(
      reducer(initialState, {
        type: WS_GET_MESSAGE,
        payload: wsMessageTestExample,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      messages: [...initialState.messages, wsMessageTestExample],
    });
  });
});
