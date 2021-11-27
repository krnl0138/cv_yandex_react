import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  DELETE_ORDER_NUMBER
} from '../actions/order-details';

const initialState = {
    ingredientsIDs: [],
    orderNumber: null,
    isLoading: false,
    hasError: false,
    order: {},
}

export const orderDetailsReducer = (state = initialState, { type, ingredientsIDs, orderNumber, order }) => {
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
          orderNumber: null
        }
      }
      default: {
        return state;
      }
    }
  }