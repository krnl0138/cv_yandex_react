import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { cartReducer } from './cart';
import { ingredientsReducer } from './ingredients';
import { modalsReducer } from './modals';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';
import { forgotPasswordReducer } from './forgot-password';
import { userReducer } from './user';
import { wsReducer } from './socket';

import { socketMiddleware } from '../middlewares/socketMiddleware';

import logger from 'redux-logger';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(logger, thunk, socketMiddleware()));

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    modals: modalsReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    cart: cartReducer,
    forgotPassword: forgotPasswordReducer,
    user: userReducer,
    ws: wsReducer,
})

export const store = createStore(rootReducer, enhancer);