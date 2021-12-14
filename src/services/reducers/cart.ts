import {
  ADD_CART_INGREDIENT,
  DELETE_CART_INGREDIENT,
  ADD_CART_INGREDIENT_BUN,
  MOVE_CART_INGREDIENT,
  CLEAR_CART_INGREDIENT
} from '../actions/cart';

import { TIngredient } from '../../types/types';

import update from 'immutability-helper';

interface IState {
  сartIngredients: Array<TIngredient>;
  bunIngredients: Array<TIngredient>;
}

interface IAction {
  type: 'ADD_CART_INGREDIENT' | 'DELETE_CART_INGREDIENT' | 'ADD_CART_INGREDIENT_BUN' | 'MOVE_CART_INGREDIENT' | 'CLEAR_CART_INGREDIENT';
  ingredient: TIngredient & {item?: {}, index?: number };
  dropIndex: number;
}

const initialState: IState = {
  сartIngredients: [],
  bunIngredients: []
}

export const cartReducer = (state: IState = initialState, { type, ingredient, dropIndex }: IAction) => {
  switch (type) {
    case ADD_CART_INGREDIENT: {
      return {
        ...state,
        сartIngredients: [...state.сartIngredients, ingredient]
      };
    }
    case ADD_CART_INGREDIENT_BUN: {
      return {
        ...state,
        bunIngredients: [ingredient]
      };
    }
    case MOVE_CART_INGREDIENT: { // ingredient: {item: TIngredient, index: number}
      return {
        ...state,
        сartIngredients: update(state.сartIngredients, {
          $splice: [
            [ingredient.index, 1],
            [dropIndex, 0, ingredient.item],
          ] as any,
        })
      };
    }
    case DELETE_CART_INGREDIENT: {
      return {
        ...state,
        сartIngredients: state.сartIngredients.filter((_, index) => index !== ingredient.item)
      };
    }
    case CLEAR_CART_INGREDIENT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}