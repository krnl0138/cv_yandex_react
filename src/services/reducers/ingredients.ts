import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_REQUEST_SUCCESS,
  GET_INGREDIENTS_REQUEST_ERROR,
  TIngredientsActions
} from '../actions/ingredients';
import type { TIngredient } from '../../types/types';

interface IState {
  readonly ingredientsData: ReadonlyArray<TIngredient>;
  readonly isLoading: boolean;
  readonly hasError: boolean;
}

const initialState: IState = {
  ingredientsData: [],
  isLoading: false,
  hasError: false
}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): IState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_INGREDIENTS_REQUEST_SUCCESS: {
      return {
        ...state,
        ingredientsData: action.payload,
        isLoading: false
      }
    }
    case GET_INGREDIENTS_REQUEST_ERROR: {
      return {
        ...state,
        isLoading: false,
        hasError: true
      }
    }
    default: {
      return state;
    }
  }
}