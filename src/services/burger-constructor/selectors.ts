import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@services/store.ts';
import type { TIngredient } from '@utils/types.ts';

export const getBun = (state: RootState): TIngredient | null =>
  state.burgerConstructor.bun;
export const getIngredients = (state: RootState): TIngredient[] =>
  state.burgerConstructor.ingredients;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
export const getCountPrice = () =>
  createSelector(
    [getBun, getIngredients],
    (bun, ingredients) =>
      ingredients.reduce((sum, item) => sum + item.price, 0) + (bun ? bun.price * 2 : 0)
  );

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
export const getCounterIngredient = (id: string) =>
  createSelector([getBun, getIngredients], (bun, ingredients) =>
    [...ingredients, bun, bun].reduce((sum, item) => sum + (item?._id === id ? 1 : 0), 0)
  );
