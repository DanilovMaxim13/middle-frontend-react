import type { RootState } from '@services/store.ts';
import type { TOrder } from '@utils/types.ts';

export const getOrder = (state: RootState): TOrder | null =>
  state.orderRegistration.order;
export const getOrderLoading = (state: RootState): boolean =>
  state.orderRegistration.loading;
export const getOrderError = (state: RootState): string | null =>
  state.orderRegistration.error;
