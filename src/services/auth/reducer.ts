import { SET_ERROR, SET_LOADING, SET_USER } from '@services/auth/actions.ts';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TUser } from '@utils/types.ts';

type TAuthReducer = {
  error: string | null;
  user: TUser | null;
  loading: boolean;
};

const initialState: TAuthReducer = {
  error: null,
  user: null,
  loading: false,
};

export const authReducer = (
  state = initialState,
  action: PayloadAction<boolean> | PayloadAction<string> | PayloadAction<TUser>
): TAuthReducer => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload as boolean,
        error: null,
      };
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };
    case SET_USER:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload as TUser,
      };
    default:
      return state;
  }
};
