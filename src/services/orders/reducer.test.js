import { initialState, ordersReducer } from './reducer.js';
import { CLOSE, MESSAGE } from './actions.ts';

describe('ordersReducer', () => {
  const mockOrders = [
    {
      _id: '1',
      ingredients: ['ingredient1', 'ingredient2'],
      status: 'done',
      name: 'Test Order 1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 12345,
    },
    {
      _id: '2',
      ingredients: ['ingredient3', 'ingredient4'],
      status: 'pending',
      name: 'Test Order 2',
      createdAt: '2023-01-01T01:00:00.000Z',
      updatedAt: '2023-01-01T01:00:00.000Z',
      number: 12346,
    },
  ];

  const mockMessagePayload = {
    orders: mockOrders,
    total: 100,
    totalToday: 10,
  };

  it('should return initial state', () => {
    expect(ordersReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('should handle MESSAGE action', () => {
    const action = {
      type: MESSAGE,
      payload: mockMessagePayload,
    };

    const expectedState = {
      orders: mockOrders,
      total: 100,
      totalToday: 10,
    };

    expect(ordersReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CLOSE action', () => {
    const stateWithData = {
      orders: mockOrders,
      total: 100,
      totalToday: 10,
    };

    const action = { type: CLOSE };
    const result = ordersReducer(stateWithData, action);

    expect(result).toEqual(initialState);
  });

  it('should handle CLOSE action when state has partial data', () => {
    const stateWithPartialData = {
      orders: mockOrders,
      total: 100,
    };

    const action = { type: CLOSE };
    const result = ordersReducer(stateWithPartialData, action);

    expect(result).toEqual(initialState);
  });

  it('should update state correctly with MESSAGE after CLOSE', () => {
    let state = ordersReducer(initialState, { type: CLOSE });
    expect(state).toEqual(initialState);

    state = ordersReducer(state, {
      type: MESSAGE,
      payload: mockMessagePayload,
    });

    expect(state).toEqual({
      orders: mockOrders,
      total: 100,
      totalToday: 10,
    });
  });

  it('should replace existing orders on MESSAGE', () => {
    const existingOrders = [
      {
        _id: 'old',
        ingredients: ['old1'],
        status: 'done',
        name: 'Old Order',
        createdAt: '2022-01-01T00:00:00.000Z',
        updatedAt: '2022-01-01T00:00:00.000Z',
        number: 11111,
      },
    ];

    const stateWithExistingData = {
      orders: existingOrders,
      total: 50,
      totalToday: 5,
    };

    const action = {
      type: MESSAGE,
      payload: mockMessagePayload,
    };

    const result = ordersReducer(stateWithExistingData, action);

    expect(result).toEqual({
      orders: mockOrders,
      total: 100,
      totalToday: 10,
    });

    expect(result.orders).toHaveLength(2);
    expect(result.orders).toEqual(mockOrders);
    expect(result.orders).not.toContainEqual(existingOrders[0]);
  });

  it('should handle MESSAGE with empty orders array', () => {
    const emptyMessagePayload = {
      orders: [],
      total: 0,
      totalToday: 0,
    };

    const action = {
      type: MESSAGE,
      payload: emptyMessagePayload,
    };

    const result = ordersReducer(initialState, action);

    expect(result).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
    });
  });

  it('should handle MESSAGE with only orders (without total and totalToday)', () => {
    const partialMessagePayload = {
      orders: mockOrders,
    };

    const action = {
      type: MESSAGE,
      payload: partialMessagePayload,
    };

    const result = ordersReducer(initialState, action);

    expect(result).toEqual({
      orders: mockOrders,
      total: undefined,
      totalToday: undefined,
    });
  });

  it('should not mutate state but create new object on MESSAGE', () => {
    const originalState = {
      orders: [],
      total: 0,
      totalToday: 0,
    };

    const action = {
      type: MESSAGE,
      payload: mockMessagePayload,
    };

    const result = ordersReducer(originalState, action);

    expect(result).not.toBe(originalState);
    expect(result.orders).not.toBe(originalState.orders);

    expect(originalState.orders).toEqual([]);
    expect(originalState.total).toBe(0);
    expect(originalState.totalToday).toBe(0);
  });

  it('should not mutate state but create new object on CLOSE', () => {
    const originalState = {
      orders: mockOrders,
      total: 100,
      totalToday: 10,
    };

    const action = { type: CLOSE };
    const result = ordersReducer(originalState, action);

    expect(result).not.toBe(originalState);

    expect(originalState.orders).toEqual(mockOrders);
    expect(originalState.total).toBe(100);
    expect(originalState.totalToday).toBe(10);
  });

  it('should handle multiple MESSAGE actions sequentially', () => {
    const firstMessagePayload = {
      orders: [mockOrders[0]],
      total: 50,
      totalToday: 5,
    };

    let state = ordersReducer(initialState, {
      type: MESSAGE,
      payload: firstMessagePayload,
    });

    expect(state).toEqual({
      orders: [mockOrders[0]],
      total: 50,
      totalToday: 5,
    });

    const secondMessagePayload = {
      orders: mockOrders,
      total: 100,
      totalToday: 10,
    };

    state = ordersReducer(state, {
      type: MESSAGE,
      payload: secondMessagePayload,
    });

    expect(state).toEqual({
      orders: mockOrders,
      total: 100,
      totalToday: 10,
    });
  });

  it('should handle the complete flow: MESSAGE -> CLOSE -> MESSAGE', () => {
    let state = ordersReducer(initialState, {
      type: MESSAGE,
      payload: mockMessagePayload,
    });

    expect(state).toEqual({
      orders: mockOrders,
      total: 100,
      totalToday: 10,
    });

    state = ordersReducer(state, { type: CLOSE });
    expect(state).toEqual(initialState);

    const newMessagePayload = {
      orders: [mockOrders[0]],
      total: 200,
      totalToday: 20,
    };

    state = ordersReducer(state, {
      type: MESSAGE,
      payload: newMessagePayload,
    });

    expect(state).toEqual({
      orders: [mockOrders[0]],
      total: 200,
      totalToday: 20,
    });
  });
});
