import { TIngredient } from "../../types/types";

export const SET_ACTIVE_INGREDIENT: 'SET_ACTIVE_INGREDIENT' = 'SET_ACTIVE_INGREDIENT';

export interface ISetActiveIngredient {
    readonly type: typeof SET_ACTIVE_INGREDIENT;
    readonly activeIngredient: TIngredient;
}

export type TIngredientDetailsActions = ISetActiveIngredient;