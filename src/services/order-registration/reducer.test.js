import { initialState, orderRegistrationReducer } from './reducer.js';
import {
  SET_AN_ORDER_FAILURE,
  SET_AN_ORDER_REQUEST,
  SET_AN_ORDER_SUCCESS,
} from './actions.ts';

describe('orderRegistrationReducer', () => {
  const mockOrder = {
    _id: '1',
    ingredients: ['ingredient1', 'ingredient2'],
    status: 'done',
    name: 'Test Order',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 12345,
  };

  it('should return initial state', () => {
    expect(orderRegistrationReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('should handle SET_AN_ORDER_REQUEST', () => {
    const action = { type: SET_AN_ORDER_REQUEST };
    const expectedState = {
      ...initialState,
      error: null,
      loading: true,
    };

    expect(orderRegistrationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_AN_ORDER_SUCCESS', () => {
    const action = { type: SET_AN_ORDER_SUCCESS, payload: mockOrder };
    const expectedState = {
      ...initialState,
      order: mockOrder,
      loading: false,
    };

    expect(orderRegistrationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_AN_ORDER_FAILURE', () => {
    const errorMessage = 'Failed to create order';
    const action = { type: SET_AN_ORDER_FAILURE, payload: errorMessage };
    const expectedState = {
      ...initialState,
      error: errorMessage,
      loading: false,
    };

    expect(orderRegistrationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should clear error and set loading on request', () => {
    const stateWithError = {
      error: 'Previous error',
      order: mockOrder,
      loading: false,
    };

    const action = { type: SET_AN_ORDER_REQUEST };
    const result = orderRegistrationReducer(stateWithError, action);

    expect(result).toEqual({
      error: null,
      order: mockOrder,
      loading: true,
    });
  });

  it('should clear loading and set order on success', () => {
    const loadingState = {
      error: null,
      order: null,
      loading: true,
    };

    const action = { type: SET_AN_ORDER_SUCCESS, payload: mockOrder };
    const result = orderRegistrationReducer(loadingState, action);

    expect(result).toEqual({
      error: null,
      order: mockOrder,
      loading: false,
    });
  });

  it('should clear loading and set error on failure', () => {
    const loadingState = {
      error: null,
      order: null,
      loading: true,
    };

    const errorMessage = 'Payment failed';
    const action = { type: SET_AN_ORDER_FAILURE, payload: errorMessage };
    const result = orderRegistrationReducer(loadingState, action);

    expect(result).toEqual({
      error: errorMessage,
      order: null,
      loading: false,
    });
  });

  it('should replace existing order on success', () => {
    const existingOrder = {
      _id: 'old',
      ingredients: ['old1'],
      status: 'pending',
      name: 'Old Order',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
      number: 11111,
    };

    const stateWithOrder = {
      error: null,
      order: existingOrder,
      loading: true,
    };

    const action = { type: SET_AN_ORDER_SUCCESS, payload: mockOrder };
    const result = orderRegistrationReducer(stateWithOrder, action);

    expect(result.order).toEqual(mockOrder);
    expect(result.order).not.toEqual(existingOrder);
  });

  it('should clear order on new request', () => {
    const stateWithOrder = {
      error: null,
      order: mockOrder,
      loading: false,
    };

    const action = { type: SET_AN_ORDER_REQUEST };
    const result = orderRegistrationReducer(stateWithOrder, action);

    expect(result).toEqual({
      error: null,
      order: mockOrder,
      loading: true,
    });
  });

  it('should handle the full flow: request -> success', () => {
    let state = orderRegistrationReducer(initialState, { type: SET_AN_ORDER_REQUEST });
    expect(state).toEqual({
      error: null,
      order: null,
      loading: true,
    });

    state = orderRegistrationReducer(state, {
      type: SET_AN_ORDER_SUCCESS,
      payload: mockOrder,
    });
    expect(state).toEqual({
      error: null,
      order: mockOrder,
      loading: false,
    });
  });

  it('should handle the flow: request -> failure', () => {
    let state = orderRegistrationReducer(initialState, { type: SET_AN_ORDER_REQUEST });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);

    const errorMessage = 'Insufficient ingredients';
    state = orderRegistrationReducer(state, {
      type: SET_AN_ORDER_FAILURE,
      payload: errorMessage,
    });
    expect(state).toEqual({
      error: errorMessage,
      order: null,
      loading: false,
    });
  });

  it('should handle the flow: with existing order -> request -> success with new order', () => {
    const existingOrder = {
      _id: 'old',
      ingredients: ['old1'],
      status: 'done',
      name: 'Previous Order',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
      number: 11111,
    };

    let state = {
      error: null,
      order: existingOrder,
      loading: false,
    };

    state = orderRegistrationReducer(state, { type: SET_AN_ORDER_REQUEST });
    expect(state).toEqual({
      error: null,
      order: existingOrder,
      loading: true,
    });

    state = orderRegistrationReducer(state, {
      type: SET_AN_ORDER_SUCCESS,
      payload: mockOrder,
    });
    expect(state).toEqual({
      error: null,
      order: mockOrder,
      loading: false,
    });
  });

  it('should preserve existing order when request fails', () => {
    const existingOrder = {
      _id: 'existing',
      ingredients: ['existing1'],
      status: 'done',
      name: 'Existing Order',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
      number: 99999,
    };

    const stateWithOrder = {
      error: null,
      order: existingOrder,
      loading: true,
    };

    const errorMessage = 'Temporary failure';
    const action = { type: SET_AN_ORDER_FAILURE, payload: errorMessage };
    const result = orderRegistrationReducer(stateWithOrder, action);

    expect(result).toEqual({
      error: errorMessage,
      order: existingOrder,
      loading: false,
    });
  });
});
