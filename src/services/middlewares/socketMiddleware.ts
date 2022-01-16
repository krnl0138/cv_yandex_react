import { Middleware, MiddlewareAPI } from "redux";
import { TWsActions, TWsFunctions } from "../actions/socket";
import { AppDispatch, RootState } from "../reducers/index";

export const socketMiddleware = (wsActions: TWsFunctions): Middleware => {
    return ( (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TWsActions) => {
            const { dispatch } = store;

            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;


            if (action.type === wsInit && action.wsUrl !== undefined) {
                socket = new WebSocket(action.wsUrl);
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    dispatch({ type: onMessage, payload: data });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

                if (action.type === wsSendMessage) {
                    const message = action.payload;
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    } ) as Middleware
}