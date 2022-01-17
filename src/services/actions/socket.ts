export const WS_CONNECTION_START = 'WS_CONNECTION_START' as const;
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS' as const;
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR' as const;
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED' as const;
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE' as const;
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE' as const;

export type TWsFunctions = {
    wsInit: typeof WS_CONNECTION_START,
    wsSendMessage: typeof WS_SEND_MESSAGE,
    onOpen: typeof WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR,
    onMessage: typeof WS_GET_MESSAGE
}

export const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
  };

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    wsUrl: string;
}
export interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    payload: Record<string, any>;
}
export interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
    // readonly error?: undefined | Record<string, any>;
}
export interface IWSGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    payload: Record<string, any>;
}
export interface IWSSendMessage {
    readonly type: typeof WS_SEND_MESSAGE;
    payload: Record<string, any>;
}

export type TWsActions = 
    IWSConnectionStart |
    IWSConnectionSuccess |
    IWSConnectionError |
    IWSConnectionClosed |
    IWSGetMessage |
    IWSSendMessage ;
