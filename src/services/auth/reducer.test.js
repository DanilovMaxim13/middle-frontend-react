import { authReducer, initialState } from './reducer.js';
import { SET_AUTH_CHECKED, SET_ERROR, SET_LOADING, SET_USER } from './actions.ts';

describe('authReducer', () => {
  it('should return initial state', () => {
    expect(authReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('should handle SET_LOADING', () => {
    const action = { type: SET_LOADING, payload: true };
    const expectedState = {
      ...initialState,
      loading: true,
      error: null,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_ERROR', () => {
    const action = { type: SET_ERROR, payload: 'Error message' };
    const expectedState = {
      ...initialState,
      loading: false,
      error: 'Error message',
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_USER', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
    };

    const action = { type: SET_USER, payload: mockUser };
    const expectedState = {
      ...initialState,
      user: mockUser,
      loading: false,
      error: null,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_AUTH_CHECKED', () => {
    const action = { type: SET_AUTH_CHECKED, payload: true };
    const expectedState = {
      ...initialState,
      isAuthChecked: true,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should preserve other state properties when updating', () => {
    const existingState = {
      error: null,
      user: { id: '1', email: 'user@example.com', name: 'Existing User' },
      loading: true,
      isAuthChecked: true,
    };

    const action = { type: SET_ERROR, payload: 'New error' };
    const result = authReducer(existingState, action);

    expect(result).toEqual({
      error: 'New error',
      user: existingState.user,
      loading: false,
      isAuthChecked: true,
    });
  });
});
