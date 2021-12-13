import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  DELETE_ORDER_NUMBER
} from '../actions/order-details';

import { TOrder } from '../../types/types';

interface IState {
  ingredientsIDs: Array<string>;
  orderNumber: null | number;
  isLoading: boolean;
  hasError: boolean;
  order: TOrder | {};
}

interface IAction {
  type:
    'POST_ORDER_REQUEST' |
    'POST_ORDER_SUCCESS' |
    'POST_ORDER_FAILED' |
    'GET_ORDER_REQUEST' |
    'GET_ORDER_SUCCESS' |
    'GET_ORDER_FAILED' |
    'DELETE_ORDER_NUMBER';
  ingredientsIDs: Array<string>;
  orderNumber: number;
  order: TOrder;
}

const initialState: IState = {
  ingredientsIDs: [],
  orderNumber: null,
  isLoading: false,
  hasError: false,
  order: {},
}

export const orderDetailsReducer = (state: IState = initialState, { type, ingredientsIDs, orderNumber, order }: IAction): IState => {
  switch (type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        orderNumber: orderNumber,
        ingredientsIDs: ingredientsIDs
      }
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        order: order,
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    }
    case DELETE_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: -1
      }
    }
    default: {
      return state;
    }
  }
}