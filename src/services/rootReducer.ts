import { combineReducers } from 'redux';

import { burgerConstructorReducer } from '@services/burger-constructor/reducer.ts';
import { burgerIngredientsReducer } from '@services/burger-ingredients/reducer.ts';
import { orderRegistrationReducer } from '@services/order-registration/reducer.ts';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  orderRegistration: orderRegistrationReducer,
});

export default rootReducer;
