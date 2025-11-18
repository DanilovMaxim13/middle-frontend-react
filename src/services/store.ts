import { configureStore } from '@reduxjs/toolkit';

import { socketMiddleware } from '@services/middleware/middleware.ts';
import { ordersActions } from '@services/orders/actions.ts';

import rootReducer from './rootReducer';

import type { ThunkDispatch } from '@reduxjs/toolkit';
import type { ordersActionsTypes } from '@services/orders/actions.ts';

const feedMiddleware = socketMiddleware(ordersActions);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedMiddleware);
  },
});

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type ApplicationActions = ordersActionsTypes;
export type AppDispatch = ThunkDispatch<RootState, unknown, ApplicationActions>;
