import { SET_ERROR, SET_LOADING } from '@services/auth/actions.ts';

import type { PayloadAction } from '@reduxjs/toolkit';

type TAuthReducer = {
  error: string | null;
  // user: any;
  loading: boolean;
};

const initialState: TAuthReducer = {
  error: null,
  // user: null,
  loading: false,
};

export const authReducer = (
  state = initialState,
  action: PayloadAction<boolean> | PayloadAction<string>
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
    default:
      return state;
  }
};
