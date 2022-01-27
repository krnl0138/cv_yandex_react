import { IBun, TIngredient } from '../../types/types';

export const ADD_CART_INGREDIENT = 'ADD_CART_INGREDIENT' as const;
export const ADD_CART_INGREDIENT_BUN = 'ADD_CART_INGREDIENT_BUN' as const;
export const DELETE_CART_INGREDIENT = 'DELETE_CART_INGREDIENT' as const;
export const MOVE_CART_INGREDIENT = 'MOVE_CART_INGREDIENT' as const;
export const CLEAR_CART_INGREDIENT = 'CLEAR_CART_INGREDIENT' as const;

export interface IAddCartIngredient {
  readonly type: typeof ADD_CART_INGREDIENT;
  readonly ingredient: TIngredient;
}

export interface IAddCartIngredientBun {
  readonly type: typeof ADD_CART_INGREDIENT_BUN;
  readonly ingredient: IBun;
}

export interface IDeleteCartIngredient {
  readonly type: typeof DELETE_CART_INGREDIENT;
  readonly ingredientIndex: number;
}

export interface IMoveCartIngredient {
  readonly type: typeof MOVE_CART_INGREDIENT;
  // readonly ingredient: { item?: Record<string, never>, index?: number };
  readonly ingredient: { item?: TIngredient; index?: number };
  readonly dropIndex: number;
}

export interface IClearCartIngredient {
  readonly type: typeof CLEAR_CART_INGREDIENT;
}

export type TCartActions =
  | IAddCartIngredient
  | IAddCartIngredientBun
  | IDeleteCartIngredient
  | IMoveCartIngredient
  | IClearCartIngredient;

export const addCartIngredientBun = (ingredient: IBun) => ({
  type: ADD_CART_INGREDIENT_BUN,
  ingredient: ingredient,
});
