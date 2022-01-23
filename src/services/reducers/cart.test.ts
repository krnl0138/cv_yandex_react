import {
  ADD_CART_INGREDIENT,
  DELETE_CART_INGREDIENT,
  MOVE_CART_INGREDIENT,
  CLEAR_CART_INGREDIENT,
  addCartIngredientBun,
} from '../actions/cart';
import { cartReducer as reducer } from './cart';
import { ingredientTestExample, ingredientBunTestExample } from '../../utils/tests-data';
import update from 'immutability-helper';

describe('', () => {
  const initialState = {
    cartIngredients: [],
    bunIngredients: [],
  };

  it('should return initial state', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should add an ingredient to the cart', () => {
    expect(
      reducer(initialState, {
        type: ADD_CART_INGREDIENT,
        ingredient: ingredientTestExample,
      })
    ).toEqual({
      ...initialState,
      cartIngredients: [...initialState.cartIngredients, ingredientTestExample],
    });
  });

  it('should add a bun to the cart', () => {
    expect(reducer(initialState, addCartIngredientBun(ingredientBunTestExample))).toEqual({
      ...initialState,
      bunIngredients: [...initialState.bunIngredients, ingredientBunTestExample],
    });
  });

  it('should delete an ingredient from the cart', () => {
    const prevState = {
      cartIngredients: [ingredientTestExample],
      bunIngredients: [],
    };
    const ingredientIndex = 0;
    expect(
      reducer(prevState, {
        type: DELETE_CART_INGREDIENT,
        ingredientIndex: 0,
      })
    ).toEqual({
      ...initialState,
      cartIngredients: prevState.cartIngredients.filter((_, index) => index !== ingredientIndex),
    });
  });

  it('should move an ingredient in the cart', () => {
    const prevState = {
      cartIngredients: [ingredientTestExample, ingredientTestExample],
      bunIngredients: [],
    };
    const ingredient = {
      item: ingredientTestExample,
      index: 1,
    };
    const dropIndex = 0;
    expect(
      reducer(prevState, {
        type: MOVE_CART_INGREDIENT,
        ingredient: ingredient,
        dropIndex: dropIndex,
      })
    ).toEqual({
      ...initialState,
      cartIngredients: update(prevState.cartIngredients, {
        $splice: [
          [ingredient.index, 1],
          [dropIndex, 0, ingredient.item],
        ],
      }),
    });
  });

  it('should clear the cart', () => {
    const prevState = {
      cartIngredients: [ingredientTestExample],
      bunIngredients: [ingredientBunTestExample],
    };
    expect(reducer(prevState, { type: CLEAR_CART_INGREDIENT })).toEqual({ ...initialState });
  });
});
