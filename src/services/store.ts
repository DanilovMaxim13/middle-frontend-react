import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux,
} from 'react-redux';

import { socketMiddleware } from '@services/middleware/middleware.ts';
import { ordersActions } from '@services/orders/actions.ts';

import rootReducer from './rootReducer';

import type { ThunkDispatch } from '@reduxjs/toolkit';
import type { burgerConstructorActionsTypes } from '@services/burger-constructor/actions.ts';
import type { burgerIngredientsActionsTypes } from '@services/burger-ingredients/actions.ts';
import type { orderRegistrationActionsTypes } from '@services/order-registration/actions.ts';
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
export type ApplicationActions =
  | ordersActionsTypes
  | burgerIngredientsActionsTypes
  | orderRegistrationActionsTypes
  | burgerConstructorActionsTypes;
export type AppDispatch = ThunkDispatch<RootState, unknown, ApplicationActions>;

export const useDispatch = useDispatchRedux.withTypes<AppDispatch>();
export const useSelector = useSelectorRedux.withTypes<RootState>();
