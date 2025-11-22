import { v4 as uuid } from 'uuid';

import type { AppDispatch } from '@services/store.ts';
import type { TIngredient } from '@utils/types.ts';

export const SET_BUN = 'SET_BUN';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';

export type burgerConstructorActionsTypes =
  | { type: 'SET_BUN'; payload: TIngredient }
  | { type: 'SET_INGREDIENTS'; payload: TIngredient[] };

export const setBun = (ingredient: TIngredient) => {
  return (dispatch: AppDispatch): void => {
    dispatch({
      type: SET_BUN,
      payload: {
        ...ingredient,
        uuid: uuid(),
      },
    });
  };
};

export const setIngredients = (ingredients: TIngredient[]) => {
  return (dispatch: AppDispatch): void => {
    const ingredientsWithId = ingredients.map((ingredient) => {
      if (ingredient.uuid) return ingredient;
      return {
        ...ingredient,
        uuid: uuid(),
      };
    });

    dispatch({
      type: SET_INGREDIENTS,
      payload: ingredientsWithId,
    });
  };
};
