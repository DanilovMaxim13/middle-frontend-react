import { baseApiUrl } from '@components/constants/api.ts';

import type { AppDispatch } from '@services/store.ts';
import type { TResponseIngredient } from '@utils/types.ts';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILURE = 'GET_INGREDIENTS_FAILURE';

export const getIngredients = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });

    try {
      const response: Response = await fetch(`${baseApiUrl}/ingredients`);
      const data: TResponseIngredient = (await response.json()) as TResponseIngredient;

      if (data.success) {
        dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data.data });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILURE,
          payload: 'Произошла ошибка!',
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch({ type: GET_INGREDIENTS_FAILURE, payload: errorMessage });
    }
  };
};
