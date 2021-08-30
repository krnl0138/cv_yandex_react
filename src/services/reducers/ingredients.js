import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR
} from '../actions/ingredients';

const initialState = {
  ingredientsData: [],
  isLoading: false,
  hasError: false
}

export const ingredientsReducer = (state = initialState, { type, payload }) => {
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