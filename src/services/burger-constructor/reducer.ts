import { SET_BUN, SET_INGREDIENTS } from '@services/burger-constructor/actions.ts';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient } from '@utils/types.ts';

type TBurgerConstructorReducer = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

const initialState: TBurgerConstructorReducer = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorReducer = (
  state = initialState,
  action: PayloadAction<TIngredient[]> | PayloadAction<TIngredient>
): TBurgerConstructorReducer => {
  switch (action.type) {
    case SET_BUN:
      return {
        ...state,
        bun: action.payload as TIngredient,
      };
    case SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload as TIngredient[],
      };
    default:
      return state;
  }
};
