import { SET_ACTIVE_INGREDIENT } from '../actions/ingredient-details';

import { TIngredient } from '../../types/types';

interface IState {
  activeIngredient: TIngredient;
}

interface IAction {
  type: 'SET_ACTIVE_INGREDIENT';
  activeIngredient: TIngredient;
}

const initialState = {
    activeIngredient: {},
} as IState

export const ingredientDetailsReducer = (state: IState = initialState, { type, activeIngredient }: IAction) => {
    switch (type) {
      case SET_ACTIVE_INGREDIENT: {
        return {
          ...state,
          activeIngredient: activeIngredient
        }
      }
      default: {
        return state;
      }
    }
  }