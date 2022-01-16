import {
  VISIBLE_ORDER_DETAILS,
  VISIBLE_INGREDIENT_DETAILS,
  VISIBLE_ORDERS_DETAILS,
  TModalsActions
} from '../actions/modals';

interface IState {
  readonly visibleOrderDetails: boolean;
  readonly visibleIngredientDetails: boolean;
  readonly visibleOrdersDetails: boolean;
}

const initialState: IState = {
  visibleOrderDetails: false,
  visibleIngredientDetails: false,
  visibleOrdersDetails: false
}

export const modalsReducer = (state = initialState, action: TModalsActions): IState => {
  switch (action.type) {
    case VISIBLE_ORDER_DETAILS: {
      return {
        ...state,
        visibleOrderDetails: action.value
      }
    }
    case VISIBLE_INGREDIENT_DETAILS: {
      return {
        ...state,
        visibleIngredientDetails: action.value
      }
    }
    case VISIBLE_ORDERS_DETAILS: {
      return {
        ...state,
        visibleOrdersDetails: action.value
      }
    }
    default: {
      return state;
    }
  }
}