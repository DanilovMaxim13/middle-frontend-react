import { createAction } from '@reduxjs/toolkit';

import type { TOrderMessage } from '@/types/feed.ts';

export const CONNECT = createAction<string>('CONNECT');
export const DISCONNECT = createAction('DISCONNECT');

export const CONNECTING = createAction('CONNECTING');
export const OPEN = createAction('OPEN');
export const CLOSE = createAction('CLOSE');
export const MESSAGE = createAction<TOrderMessage>('MESSAGE');
export const ERROR = createAction<string>('ERROR');

export const ordersActions = {
  connect: CONNECT,
  disconnect: DISCONNECT,
  onConnecting: CONNECTING,
  onOpen: OPEN,
  onClose: CLOSE,
  onMessage: MESSAGE,
  onError: ERROR,
};
