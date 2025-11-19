import { request } from '@components/constants/api.ts';

import type { AppDispatch, RootState } from '@services/store.ts';
import type { TIngredient, TResponseOrders } from '@utils/types.ts';

export const SET_AN_ORDER_REQUEST = 'SET_AN_ORDER_REQUEST';
export const SET_AN_ORDER_SUCCESS = 'SET_AN_ORDER_SUCCESS';
export const SET_AN_ORDER_FAILURE = 'SET_AN_ORDER_FAILURE';

export type orderRegistrationActionsTypes =
  | { type: 'SET_AN_ORDER_REQUEST' }
  | {
      type: 'SET_AN_ORDER_SUCCESS';
      payload: { name: string; order: { number: number } };
    }
  | { type: 'SET_AN_ORDER_FAILURE'; payload: string };

export const setOrder = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    const burgerConstructor = getState().burgerConstructor;
    const accessToken = localStorage.getItem('accessToken') ?? '';

    if (!burgerConstructor.bun || burgerConstructor.ingredients.length === 0) {
      dispatch({
        type: SET_AN_ORDER_FAILURE,
        payload: 'Не выбраны булки или ингредиенты',
      });

      return;
    }

    const ingredients: TIngredient[] = [
      burgerConstructor.bun,
      ...burgerConstructor.ingredients,
      burgerConstructor.bun,
    ];
    dispatch({ type: SET_AN_ORDER_REQUEST });

    try {
      const data: TResponseOrders = await request<TResponseOrders>('/orders', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          authorization: accessToken,
        },
        body: JSON.stringify({ ingredients: ingredients.map((item) => item?._id) }),
      });

      dispatch({
        type: SET_AN_ORDER_SUCCESS,
        payload: { name: data.name, order: data.order },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch({ type: SET_AN_ORDER_FAILURE, payload: errorMessage });
    }
  };
};
