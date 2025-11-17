import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';
import type { RootState } from '@services/store.ts';

export type WsActions<R> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onConnecting?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
};

const RECONNECT_PERIOD = 5000;

export const socketMiddleware = <A>(
  wsActions: WsActions<A>
): Middleware<Record<string, never>, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;

    const { connect, disconnect, onConnecting, onClose, onOpen, onError, onMessage } =
      wsActions;

    const { dispatch } = store;
    let reconnectTimer = 0;
    let isConnected = false;
    let url = '';

    return (next) => (action) => {
      if (connect.match(action)) {
        socket = new WebSocket(action.payload);
        url = action.payload;
        isConnected = true;
        onConnecting && dispatch(onConnecting());

        socket.onopen = (): void => {
          onOpen && dispatch(onOpen());
        };

        socket.onclose = (): void => {
          onClose && dispatch(onClose());

          if (isConnected) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            reconnectTimer = setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        };

        socket.onerror = (): void => {
          dispatch(onError('Произошла ошибка!'));
        };

        socket.onmessage = (event): void => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { data } = event;

          try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const parsedData: never = JSON.parse(data as never);
            dispatch(onMessage(parsedData));
          } catch (error) {
            dispatch(onError((error as Error).message));
          }
        };

        return;
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close();
        socket = null;

        return;
      }

      return next(action);
    };
  };
};
