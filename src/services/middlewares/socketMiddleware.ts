import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE } from "../actions/socket";

interface IAction {
    type: string; // ?
    payload: Record<string, never>;
    wsUrl?: string;
}

interface INext {
    (action: IAction): Record<string, any>
}

export const socketMiddleware = () => (store: any) => {
    let socket: WebSocket | null = null;

    return (next: INext) => (action: IAction) => {
        const { dispatch } = store;
        const { type, payload } = action;

        if (type === WS_CONNECTION_START && action.wsUrl !== undefined) {
            socket = new WebSocket(action.wsUrl);
        }

        if (socket) {
            socket.onopen = event => {
                dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
            };

            socket.onerror = event => {
                dispatch({ type: WS_CONNECTION_ERROR, payload: event });
            };

            socket.onmessage = event => {
                const { data } = event;
                dispatch({ type: WS_GET_MESSAGE, payload: data });
            };

            socket.onclose = event => {
                dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
            };

            if (type === WS_SEND_MESSAGE) {
                const message = payload;
                socket.send(JSON.stringify(message));
            }
        }

        next(action);
    };
}