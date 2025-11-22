import {
  SET_AN_ORDER_FAILURE,
  SET_AN_ORDER_REQUEST,
  SET_AN_ORDER_SUCCESS,
} from '@services/order-registration/actions.ts';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TOrder } from '@utils/types.ts';

interface TOrderRegistrationReducer {
  error: string | null;
  order: TOrder | null;
  loading: boolean;
}

export const initialState: TOrderRegistrationReducer = {
  error: null,
  order: null,
  loading: false,
};

export const orderRegistrationReducer = (
  state = initialState,
  action: PayloadAction<TOrder> | PayloadAction<string>
): TOrderRegistrationReducer => {
  switch (action.type) {
    case SET_AN_ORDER_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case SET_AN_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload as TOrder,
        loading: false,
      };
    case SET_AN_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload as string,
        loading: false,
      };
    default:
      return state;
  }
};
