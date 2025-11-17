import { configureStore } from '@reduxjs/toolkit';
// import {
//   useDispatch as useDispatchRedux,
//   useSelector as useSelectorRedux,
// } from 'react-redux';

import { socketMiddleware } from '@services/middleware/middleware.ts';
import { ordersActions } from '@services/orders/actions.ts';

import rootReducer from './rootReducer';

import type { ThunkDispatch } from '@reduxjs/toolkit';

const feedMiddleware = socketMiddleware(ordersActions);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedMiddleware);
  },
});

export default store;

export type AppStore = typeof store;
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = ReturnType<AppStore['dispatch']>;

export type RootState = ReturnType<typeof rootReducer>;
// export type ApplicationActions = LiveTableActionTypes;
//export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, unknown, never>;

// export const useDispatch = useDispatchRedux.withTypes<AppDispatch>();
// export const useSelector = useSelectorRedux.withTypes<RootState>();
