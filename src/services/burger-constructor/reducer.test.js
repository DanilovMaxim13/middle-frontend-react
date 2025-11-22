import { burgerConstructorReducer, initialState } from './reducer.js';
import { SET_BUN, SET_INGREDIENTS } from './actions.ts';

describe('burgerConstructorReducer', () => {
  const mockIngredient = {
    _id: '1',
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
  };

  const mockBun = {
    _id: '2',
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
  };

  const mockIngredients = [
    mockIngredient,
    {
      _id: '3',
      name: 'Another Ingredient',
      type: 'sauce',
      proteins: 2,
      fat: 1,
      carbohydrates: 8,
      calories: 50,
      price: 30,
      image: 'sauce-image.jpg',
      image_mobile: 'sauce-image-mobile.jpg',
      image_large: 'sauce-image-large.jpg',
      __v: 0,
    },
  ];

  it('should return initial state', () => {
    expect(burgerConstructorReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('should handle SET_BUN', () => {
    const action = { type: SET_BUN, payload: mockBun };
    const expectedState = {
      ...initialState,
      bun: mockBun,
    };

    expect(burgerConstructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_INGREDIENTS', () => {
    const action = { type: SET_INGREDIENTS, payload: mockIngredients };
    const expectedState = {
      ...initialState,
      ingredients: mockIngredients,
    };

    expect(burgerConstructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should update bun and preserve ingredients', () => {
    const existingState = {
      bun: null,
      ingredients: mockIngredients,
    };

    const action = { type: SET_BUN, payload: mockBun };
    const result = burgerConstructorReducer(existingState, action);

    expect(result).toEqual({
      bun: mockBun,
      ingredients: mockIngredients,
    });
  });

  it('should update ingredients and preserve bun', () => {
    const existingState = {
      bun: mockBun,
      ingredients: [],
    };

    const action = { type: SET_INGREDIENTS, payload: mockIngredients };
    const result = burgerConstructorReducer(existingState, action);

    expect(result).toEqual({
      bun: mockBun,
      ingredients: mockIngredients,
    });
  });

  it('should handle setting bun to null', () => {
    const existingState = {
      bun: mockBun,
      ingredients: mockIngredients,
    };

    const action = { type: SET_BUN, payload: null };
    const result = burgerConstructorReducer(existingState, action);

    expect(result).toEqual({
      bun: null,
      ingredients: mockIngredients,
    });
  });

  it('should handle setting ingredients to empty array', () => {
    const existingState = {
      bun: mockBun,
      ingredients: mockIngredients,
    };

    const action = { type: SET_INGREDIENTS, payload: [] };
    const result = burgerConstructorReducer(existingState, action);

    expect(result).toEqual({
      bun: mockBun,
      ingredients: [],
    });
  });

  it('should not mutate state', () => {
    const originalState = {
      bun: mockBun,
      ingredients: [...mockIngredients],
    };

    const action = { type: SET_INGREDIENTS, payload: [] };
    const result = burgerConstructorReducer(originalState, action);

    expect(originalState.ingredients).toEqual(mockIngredients);
    expect(originalState.bun).toEqual(mockBun);

    expect(result).not.toBe(originalState);
    expect(result.ingredients).not.toBe(originalState.ingredients);
  });
});
