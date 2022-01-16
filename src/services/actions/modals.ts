export const VISIBLE_ORDER_DETAILS: 'VISIBLE_ORDER_DETAILS' = 'VISIBLE_ORDER_DETAILS';
export const VISIBLE_INGREDIENT_DETAILS: 'VISIBLE_INGREDIENT_DETAILS' = 'VISIBLE_INGREDIENT_DETAILS';
export const VISIBLE_ORDERS_DETAILS: 'VISIBLE_ORDERS_DETAILS' = 'VISIBLE_ORDERS_DETAILS';

export interface IVisibleOrderDetails {
    readonly type: typeof VISIBLE_ORDER_DETAILS;
    readonly value: boolean;
}
export interface IVisibleIngredientDetails {
    readonly type: typeof VISIBLE_INGREDIENT_DETAILS;
    readonly value: boolean;
}
export interface IVisibleOrdersDetails {
    readonly type: typeof VISIBLE_ORDERS_DETAILS;
    readonly value: boolean;
};

export type TModalsActions = IVisibleOrderDetails | IVisibleIngredientDetails | IVisibleOrdersDetails;