import type { RootState } from '@services/store.ts';

export const getLoading = (state: RootState): boolean => state.auth.loading;
