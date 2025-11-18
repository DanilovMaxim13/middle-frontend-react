import { createReducer } from '@reduxjs/toolkit';

import { CLOSE, MESSAGE } from '@services/orders/actions.ts';

import type { TOrder } from '@/types/feed.ts';

type TOrdersReducer = {
  orders: TOrder[];
  total?: number;
  totalToday?: number;
};

const initialState: TOrdersReducer = {
  orders: [],
};

export const ordersReducer = createReducer(initialState, (builder) => {
  builder.addCase(MESSAGE, (state, action) => {
    state.orders = action.payload.orders;
    state.total = action.payload.total;
    state.totalToday = action.payload.totalToday;
  });
  builder.addCase(CLOSE, (state) => {
    state.orders = [];
    state.total = undefined;
    state.totalToday = undefined;
  });
});
