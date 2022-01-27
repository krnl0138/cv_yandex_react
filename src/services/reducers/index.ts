import thunk from 'redux-thunk';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, compose, Dispatch } from 'redux';

import { combineReducers, applyMiddleware, createStore } from 'redux';
import { cartReducer } from './cart';
import { ingredientsReducer } from './ingredients';
import { modalsReducer } from './modals';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';
import { forgotPasswordReducer } from './forgot-password';
import { userReducer } from './user';
import { wsReducer } from './socket';
import { socketMiddleware } from '../middlewares/socketMiddleware';

import { TCartActions } from '../actions/cart';
import { TForgotPasswordActions } from '../actions/forgot-password';
import { TIngredientsActions } from '../actions/ingredients';
import { TIngredientDetailsActions } from '../actions/ingredient-details';
import { TModalsActions } from '../actions/modals';
import { TOrderDetailsActions } from '../actions/order-details';
import { TWsActions, wsActions } from '../actions/socket';
import { TUserActions } from '../actions/user';
import { TAuthActions } from '../actions/auth/index';

// Modules for dev
// import { composeWithDevTools } from 'redux-devtools-extension';
// import logger from 'redux-logger';

// const enhancer = composeWithDevTools(applyMiddleware(logger, thunk, socketMiddleware(wsActions)));
const enhancer = compose(applyMiddleware(thunk, socketMiddleware(wsActions)));

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modals: modalsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  cart: cartReducer,
  forgotPassword: forgotPasswordReducer,
  user: userReducer,
  ws: wsReducer,
});

export const store = createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof rootReducer>;

export type TApplicationActions =
  | TCartActions
  | TForgotPasswordActions
  | TIngredientsActions
  | TIngredientDetailsActions
  | TModalsActions
  | TOrderDetailsActions
  | TWsActions
  | TUserActions
  | TAuthActions;

// Typed thunks
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Typed dispatch
export type AppDispatch = Dispatch<TApplicationActions>;
