import {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_INGREDIENTS_ID
} from '../actions/order-details';

const initialState = {
    ingredientsIDs: [],
    orderNumber: null,
    isLoading: false,
    hasError: false,
}

export const orderDetailsReducer = (state = initialState, { type, ingredientsIDs, orderNumber }) => {
    switch (type) {
      case GET_ORDER_NUMBER_REQUEST: {
        return {
          ...state,
          isLoading: true
        }
      }
      case GET_ORDER_NUMBER_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          orderNumber: orderNumber,
        }
      }
      case GET_ORDER_NUMBER_FAILED: {
        return {
          ...state,
          isLoading: false,
          hasError: true,
        }
      }
      case GET_ORDER_INGREDIENTS_ID: {
        return {
          ...state,
          ingredientsIDs: ingredientsIDs
        }
      }
      default: {
        return state;
      }
    }
  }