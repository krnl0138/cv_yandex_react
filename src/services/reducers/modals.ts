import {
  VISIBLE_ORDER_DETAILS,
  VISIBLE_INGREDIENT_DETAILS,
  VISIBLE_ORDERS_DETAILS
} from '../actions/modals';

interface IState {
  visibleOrderDetails: boolean;
  visibleIngredientDetails: boolean;
  visibleOrdersDetails: boolean;
}

interface IAction {
  type: 'VISIBLE_ORDER_DETAILS' | 'VISIBLE_INGREDIENT_DETAILS' | 'VISIBLE_ORDERS_DETAILS';
  value: boolean;
}

const initialState: IState = {
  visibleOrderDetails: false,
  visibleIngredientDetails: false,
  visibleOrdersDetails: false
}

export const modalsReducer = (state: IState = initialState, { type, value }: IAction) => {
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