import type { TOrder } from '@/types/feed.ts';
import type { RootState } from '@services/store.ts';

export const getOrders = (state: RootState): TOrder[] => state.orders.orders;
export const getTotal = (state: RootState): number | undefined => state.orders.total;
export const getTotalToday = (state: RootState): number | undefined =>
  state.orders.totalToday;
