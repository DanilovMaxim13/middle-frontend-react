import { combineReducers } from 'redux';

import { authReducer } from '@services/auth/reducer.ts';
import { burgerConstructorReducer } from '@services/burger-constructor/reducer.ts';
import { burgerIngredientsReducer } from '@services/burger-ingredients/reducer.ts';
import { orderRegistrationReducer } from '@services/order-registration/reducer.ts';

const rootReducer = combineReducers({
  auth: authReducer,
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  orderRegistration: orderRegistrationReducer,
});

export default rootReducer;
