import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  RESET_ORDER_NUMBER,
  TOrderDetailsActions
} from '../actions/order-details';

import type { TOrder } from '../../types/types';

interface IState {
  ingredientsIDs: ReadonlyArray<string>;
  orderNumber: null | number;
  isLoading: boolean;
  hasError: boolean;
  order: TOrder | Record<string, never>;
}

const initialState: IState = {
  ingredientsIDs: [],
  orderNumber: null,
  isLoading: false,
  hasError: false,
  order: {},
}

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsActions): IState => {
  switch (action.type) {
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
        orderNumber: action.orderNumber,
        ingredientsIDs: action.ingredientsIDs
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
        order: action.order,
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    }
    case RESET_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: null,
      }
    }
    default: {
      return state;
    }
  }
}