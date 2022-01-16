import { SET_ACTIVE_INGREDIENT, TIngredientDetailsActions } from '../actions/ingredient-details';
import type { TIngredient } from '../../types/types';

interface IState {
  readonly activeIngredient: TIngredient | null;
}

const initialState: IState = {
  activeIngredient: null,
}

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions): IState => {
  switch (action.type) {
    case SET_ACTIVE_INGREDIENT: {
      return {
        ...state,
        activeIngredient: action.activeIngredient
      }
    }
    default: {
      return state;
    }
  }
}