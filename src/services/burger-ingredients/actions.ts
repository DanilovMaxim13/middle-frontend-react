import { request } from '@components/constants/api.ts';

import type { AppDispatch } from '@services/store.ts';
import type { TResponseIngredient } from '@utils/types.ts';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILURE = 'GET_INGREDIENTS_FAILURE';

export const getIngredients = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });

    try {
      const data: TResponseIngredient =
        await request<TResponseIngredient>('/ingredients');

      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data.data });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch({ type: GET_INGREDIENTS_FAILURE, payload: errorMessage });
    }
  };
};
