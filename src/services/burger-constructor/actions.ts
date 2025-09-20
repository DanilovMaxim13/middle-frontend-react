import type { AppDispatch } from '@services/store.ts';
import type { TIngredient } from '@utils/types.ts';

export const SET_BUN = 'SET_BUN';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';

export const setBun = (ingredient: TIngredient) => {
  return (dispatch: AppDispatch): void => {
    dispatch({
      type: SET_BUN,
      payload: ingredient,
    });
  };
};

export const setIngredients = (ingredients: TIngredient[]) => {
  return (dispatch: AppDispatch): void => {
    dispatch({
      type: SET_INGREDIENTS,
      payload: ingredients,
    });
  };
};
