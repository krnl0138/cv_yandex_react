export const socketMiddleware = () => {
    return ((store) => {
        let socket = null;

        return next => (action) => {
            const { dispatch } = store;
            const { type, payload } = action;

            if (type === 'WS_CONNECTION_START') {
                socket = new WebSocket(action.wsUrl);
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    dispatch({ type: 'WS_GET_MESSAGE', payload: data });
                };

                socket.onclose = event => {
                    dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
                };

                if (type === 'WS_SEND_MESSAGE') {
                    const message = payload;
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    })
};