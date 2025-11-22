import { burgerIngredientsReducer, initialState } from './reducer.js';
import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILURE,
} from './actions.ts';

describe('burgerIngredientsReducer', () => {
  const mockIngredients = [
    {
      _id: '1',
      name: 'Test Bun',
      type: 'bun',
      proteins: 5,
      fat: 3,
      carbohydrates: 20,
      calories: 150,
      price: 80,
      image: 'bun-image.jpg',
      image_mobile: 'bun-image-mobile.jpg',
      image_large: 'bun-image-large.jpg',
      __v: 0,
    },
    {
      _id: '2',
      name: 'Test Ingredient',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 15,
      calories: 100,
      price: 50,
      image: 'test-image.jpg',
      image_mobile: 'test-image-mobile.jpg',
      image_large: 'test-image-large.jpg',
      __v: 0,
    },
  ];

  it('should return initial state', () => {
    expect(burgerIngredientsReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    const action = { type: GET_INGREDIENTS_REQUEST };
    const expectedState = {
      ...initialState,
      error: null,
      loading: true,
    };

    expect(burgerIngredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    const action = { type: GET_INGREDIENTS_SUCCESS, payload: mockIngredients };
    const expectedState = {
      ...initialState,
      ingredients: mockIngredients,
      loading: false,
    };

    expect(burgerIngredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle GET_INGREDIENTS_FAILURE', () => {
    const errorMessage = 'Failed to fetch ingredients';
    const action = { type: GET_INGREDIENTS_FAILURE, payload: errorMessage };
    const expectedState = {
      ...initialState,
      error: errorMessage,
      loading: false,
    };

    expect(burgerIngredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should clear error and set loading on request', () => {
    const stateWithError = {
      error: 'Previous error',
      ingredients: [],
      loading: false,
    };

    const action = { type: GET_INGREDIENTS_REQUEST };
    const result = burgerIngredientsReducer(stateWithError, action);

    expect(result).toEqual({
      error: null,
      ingredients: [],
      loading: true,
    });
  });

  it('should clear loading and set ingredients on success', () => {
    const loadingState = {
      error: null,
      ingredients: [],
      loading: true,
    };

    const action = { type: GET_INGREDIENTS_SUCCESS, payload: mockIngredients };
    const result = burgerIngredientsReducer(loadingState, action);

    expect(result).toEqual({
      error: null,
      ingredients: mockIngredients,
      loading: false,
    });
  });

  it('should clear loading and set error on failure', () => {
    const loadingState = {
      error: null,
      ingredients: [],
      loading: true,
    };

    const errorMessage = 'Network error';
    const action = { type: GET_INGREDIENTS_FAILURE, payload: errorMessage };
    const result = burgerIngredientsReducer(loadingState, action);

    expect(result).toEqual({
      error: errorMessage,
      ingredients: [],
      loading: false,
    });
  });

  it('should preserve existing ingredients when making new request', () => {
    const stateWithIngredients = {
      error: null,
      ingredients: mockIngredients,
      loading: false,
    };

    const action = { type: GET_INGREDIENTS_REQUEST };
    const result = burgerIngredientsReducer(stateWithIngredients, action);

    expect(result).toEqual({
      error: null,
      ingredients: mockIngredients,
      loading: true,
    });
  });

  it('should replace ingredients on success', () => {
    const existingIngredients = [
      {
        _id: 'old',
        name: 'Old Ingredient',
        type: 'sauce',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 10,
        price: 10,
        image: 'old.jpg',
        image_mobile: 'old-mobile.jpg',
        image_large: 'old-large.jpg',
        __v: 0,
      },
    ];

    const stateWithOldIngredients = {
      error: null,
      ingredients: existingIngredients,
      loading: true,
    };

    const action = { type: GET_INGREDIENTS_SUCCESS, payload: mockIngredients };
    const result = burgerIngredientsReducer(stateWithOldIngredients, action);

    expect(result.ingredients).toEqual(mockIngredients);
    expect(result.ingredients).not.toEqual(existingIngredients);
  });

  it('should handle the full flow: request -> success', () => {
    let state = burgerIngredientsReducer(initialState, {
      type: GET_INGREDIENTS_REQUEST,
    });
    expect(state).toEqual({
      error: null,
      ingredients: [],
      loading: true,
    });

    state = burgerIngredientsReducer(state, {
      type: GET_INGREDIENTS_SUCCESS,
      payload: mockIngredients,
    });
    expect(state).toEqual({
      error: null,
      ingredients: mockIngredients,
      loading: false,
    });
  });

  it('should handle the flow: request -> failure', () => {
    let state = burgerIngredientsReducer(initialState, {
      type: GET_INGREDIENTS_REQUEST,
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);

    const errorMessage = 'API Error';
    state = burgerIngredientsReducer(state, {
      type: GET_INGREDIENTS_FAILURE,
      payload: errorMessage,
    });
    expect(state).toEqual({
      error: errorMessage,
      ingredients: [],
      loading: false,
    });
  });
});
