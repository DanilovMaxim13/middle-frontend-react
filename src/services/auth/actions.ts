// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { request } from '@components/constants/api.ts';

import type { AppDispatch } from '@services/store.ts';
import type { TUser } from '@utils/types.ts';

export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_USER = 'SET_USER';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';

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

      if (data.success) {
        dispatch({ type: SET_USER, payload: data.user as TUser });

        localStorage.setItem('accessToken', data.accessToken as string);
        localStorage.setItem('refreshToken', data.refreshToken as string);
      }
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

      if (data.success) {
        dispatch({ type: SET_USER, payload: data.user as TUser });

        localStorage.setItem('accessToken', data.accessToken as string);
        localStorage.setItem('refreshToken', data.refreshToken as string);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch({ type: SET_ERROR, payload: errorMessage });
    }
  };
};

export const getUser = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      await dispatch(getToken());
      return void dispatch(getUser());
    }

    try {
      const data = await request('/auth/user', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          authorization: accessToken,
        },
      });

      if (data.success) {
        dispatch({ type: SET_USER, payload: data.user as TUser });
        dispatch({ type: SET_AUTH_CHECKED, payload: true });
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        await dispatch(getToken());
        return void dispatch(getUser());
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch({ type: SET_ERROR, payload: errorMessage });
      dispatch({ type: SET_AUTH_CHECKED, payload: true });
    }
  };
};

export const getToken = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      const data = await request('/auth/token', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          token: refreshToken,
        }),
      });

      if (data.success) {
        dispatch({ type: SET_USER, payload: data.user as TUser });

        localStorage.setItem('accessToken', data.accessToken as string);
        localStorage.setItem('refreshToken', data.refreshToken as string);
      } else {
        void dispatch(logout());
      }
    } catch (error) {
      void dispatch(logout());
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch({ type: SET_ERROR, payload: errorMessage });
    }
  };
};

export const logout = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      const data = await request('/auth/logout', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          token: refreshToken,
        }),
      });

      if (data.success) {
        dispatch({ type: SET_USER, payload: null });

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch({ type: SET_ERROR, payload: errorMessage });
    }
  };
};

export const setUser = (name: string, email: string, password: string) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      await dispatch(getToken());
      return void dispatch(getUser());
    }

    try {
      const data = await request('/auth/user', {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          authorization: accessToken,
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (data.success) {
        dispatch({ type: SET_USER, payload: data.user as TUser });
        dispatch({ type: SET_AUTH_CHECKED, payload: true });
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        await dispatch(getToken());
        return void dispatch(getUser());
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch({ type: SET_ERROR, payload: errorMessage });
      dispatch({ type: SET_AUTH_CHECKED, payload: true });
    }
  };
};
