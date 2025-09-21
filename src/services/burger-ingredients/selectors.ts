import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@services/store.ts';
import type { TIngredient } from '@utils/types.ts';

export const getIngredientsSelector = (state: RootState): TIngredient[] =>
  state.burgerIngredients.ingredients;
export const getIngredientsLoading = (state: RootState): boolean =>
  state.burgerIngredients.loading;
export const getIngredientsError = (state: RootState): string | null =>
  state.burgerIngredients.error;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
export const getIngredientById = (id: string) =>
  createSelector([getIngredientsSelector], (items) =>
    items.find((item) => item._id === id)
  );
