import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR
} from '../actions/ingredients';

import { TIngredient } from '../../types/types';

interface IState {
  ingredientsData: Array<TIngredient>;
  isLoading: boolean;
  hasError: boolean;
}

interface IAction {
  type: 'GET_INGREDIENTS_REQUEST' | 'GET_INGREDIENTS_SUCCESS' | 'GET_INGREDIENTS_ERROR';
  payload: Array<TIngredient>;
}

const initialState: IState = {
  ingredientsData: [],
  isLoading: false,
  hasError: false
}

export const ingredientsReducer = (state:IState = initialState, { type, payload }: IAction) => {
  switch (type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsData: payload,
        isLoading: false
      }
    }
    case GET_INGREDIENTS_ERROR: {
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