import {
  SET_VISIBLE_ORDER_DETAILS,
  SET_VISIBLE_INGREDIENT_DETAILS,
  SET_VISIBLE_ORDERS_DETAILS,
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
    case SET_VISIBLE_ORDER_DETAILS: {
      return {
        ...state,
        visibleOrderDetails: action.value
      }
    }
    case SET_VISIBLE_INGREDIENT_DETAILS: {
      return {
        ...state,
        visibleIngredientDetails: action.value
      }
    }
    case SET_VISIBLE_ORDERS_DETAILS: {
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