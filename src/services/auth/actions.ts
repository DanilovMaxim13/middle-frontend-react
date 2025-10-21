import { request } from '@components/constants/api.ts';

import type { AppDispatch } from '@services/store.ts';
import type { NavigateFunction } from 'react-router-dom';

export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

export const login = (email: string, password: string) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch({ type: SET_LOADING, payload: true });

    try {
      const data = await request('/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log(data);
      dispatch({ type: SET_LOADING, payload: false });
      // dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data.data });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch({ type: SET_ERROR, payload: errorMessage });
    }
  };
};

export const register = (name: string, email: string, password: string) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch({ type: SET_LOADING, payload: true });

    try {
      const data = await request('/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      console.log(data);
      dispatch({ type: SET_LOADING, payload: false });
      // dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data.data });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch({ type: SET_ERROR, payload: errorMessage });
    }
  };
};

export const forgotPassword = (email: string, navigate: NavigateFunction) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch({ type: SET_LOADING, payload: true });

    try {
      const data = await request('/password-reset', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (data.success) {
        dispatch({ type: SET_LOADING, payload: false });
        void navigate('/reset-password');
      }
      // dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data.data });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch({ type: SET_ERROR, payload: errorMessage });
    }
  };
};

export const resetPassword = (
  password: string,
  token: string,
  navigate: NavigateFunction
) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch({ type: SET_LOADING, payload: true });

    try {
      const data = await request('/password-reset/reset', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          password,
          token,
        }),
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (data.success) {
        dispatch({ type: SET_LOADING, payload: false });
        void navigate('/login');
      }
      // dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data.data });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch({ type: SET_ERROR, payload: errorMessage });
    }
  };
};
