export const SET_VISIBLE_ORDER_DETAILS = 'SET_VISIBLE_ORDER_DETAILS' as const;
export const SET_VISIBLE_INGREDIENT_DETAILS = 'SET_VISIBLE_INGREDIENT_DETAILS' as const;
export const SET_VISIBLE_ORDERS_DETAILS = 'SET_VISIBLE_ORDERS_DETAILS' as const;

export interface IVisibleOrderDetails {
  readonly type: typeof SET_VISIBLE_ORDER_DETAILS;
  readonly value: boolean;
}
export interface IVisibleIngredientDetails {
  readonly type: typeof SET_VISIBLE_INGREDIENT_DETAILS;
  readonly value: boolean;
}
export interface IVisibleOrdersDetails {
  readonly type: typeof SET_VISIBLE_ORDERS_DETAILS;
  readonly value: boolean;
}

export type TModalsActions =
  | IVisibleOrderDetails
  | IVisibleIngredientDetails
  | IVisibleOrdersDetails;
