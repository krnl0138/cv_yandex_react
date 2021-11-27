import {
  VISIBLE_ORDER_DETAILS,
  VISIBLE_INGREDIENT_DETAILS,
  VISIBLE_ORDERS_DETAILS
} from '../actions/modals';

const initialState = {
  visibleOrderDetails: false,
  visibleIngredientDetails: false,
  visibleOrdersDetails: false
}

export const modalsReducer = (state = initialState, { type, value }) => {
  switch (type) {
    case VISIBLE_ORDER_DETAILS: {
      return {
        ...state,
        visibleOrderDetails: value
      }
    }
    case VISIBLE_INGREDIENT_DETAILS: {
      return {
        ...state,
        visibleIngredientDetails: value
      }
    }
    case VISIBLE_ORDERS_DETAILS: {
      return {
        ...state,
        visibleOrdersDetails: value
      }
    }
    default: {
      return state;
    }
  }
}