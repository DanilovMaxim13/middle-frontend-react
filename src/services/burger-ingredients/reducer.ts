import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILURE,
} from '@services/burger-ingredients/actions.ts';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient } from '@utils/types.ts';

interface TBurgerIngredientsReducer {
  error: string | null;
  ingredients: TIngredient[];
  loading: boolean;
}

export const initialState: TBurgerIngredientsReducer = {
  error: null,
  ingredients: [],
  loading: false,
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: PayloadAction<TIngredient[]> | PayloadAction<string>
): TBurgerIngredientsReducer => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload as TIngredient[],
        loading: false,
      };
    case GET_INGREDIENTS_FAILURE:
      return {
        ...state,
        error: action.payload as string,
        loading: false,
      };
    default:
      return state;
  }
};
