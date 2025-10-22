import type { RootState } from '@services/store.ts';
import type { TUser } from '@utils/types.ts';

export const getLoading = (state: RootState): boolean => state.auth.loading;
export const getUser = (state: RootState): TUser | null => state.auth.user;
export const getIsAuthChecked = (state: RootState): boolean => state.auth.isAuthChecked;
