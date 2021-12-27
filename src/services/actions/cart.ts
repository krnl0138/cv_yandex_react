import { TIngredient } from "../../types/types";

export const ADD_CART_INGREDIENT: 'ADD_CART_INGREDIENT' = 'ADD_CART_INGREDIENT';
export const ADD_CART_INGREDIENT_BUN: 'ADD_CART_INGREDIENT_BUN' = 'ADD_CART_INGREDIENT_BUN';
export const DELETE_CART_INGREDIENT: 'DELETE_CART_INGREDIENT' = 'DELETE_CART_INGREDIENT';
export const MOVE_CART_INGREDIENT: 'MOVE_CART_INGREDIENT' = 'MOVE_CART_INGREDIENT';
export const CLEAR_CART_INGREDIENT: 'CLEAR_CART_INGREDIENT' = 'CLEAR_CART_INGREDIENT';

export interface IAddCartIngredient {
    readonly type: typeof ADD_CART_INGREDIENT;
    readonly ingredient: TIngredient;
}

export interface IAddCartIngredientBun {
    readonly type: typeof ADD_CART_INGREDIENT_BUN;
    readonly ingredient: TIngredient;
}

export interface IDeleteCartIngredient {
    readonly type: typeof DELETE_CART_INGREDIENT;
    readonly ingredientIndex: number;
}

export interface IMoveCartIngredient {
    readonly type: typeof MOVE_CART_INGREDIENT;
    readonly ingredient: TIngredient & { item?: {}, index?: number };
    readonly dropIndex: number;
}

export interface IClearCartIngredient {
    readonly type: typeof CLEAR_CART_INGREDIENT;
}

export type TCartActions = 
    IAddCartIngredient |
    IAddCartIngredientBun |
    IDeleteCartIngredient |
    IMoveCartIngredient |
    IClearCartIngredient;