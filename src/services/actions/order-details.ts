import { POST_ORDER_URL, GET_ORDER_URL } from '../../utils/api-urls';
import { CLEAR_CART_INGREDIENT } from './cart';

import { getCookie } from '../../utils/cookies';
import { checkResponse } from '../../utils/helpers';

import { TIngredientsIDs, TOrder } from '../../types/types';
import { AppDispatch, AppThunk } from '../reducers';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST' as const;
export const POST_ORDER_REQUEST_SUCCESS = 'POST_ORDER_REQUEST_SUCCESS' as const;
export const POST_ORDER_REQUEST_FAILED = 'POST_ORDER_REQUEST_FAILED' as const;
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST' as const;
export const GET_ORDER_REQUEST_SUCCESS = 'GET_ORDER_REQUEST_SUCCESS' as const;
export const GET_ORDER_REQUEST_FAILED = 'GET_ORDER_REQUEST_FAILED' as const;
export const RESET_ORDER_NUMBER = 'RESET_ORDER_NUMBER' as const;

export interface IPostOrderRequest {
  readonly type: typeof POST_ORDER_REQUEST;
}
export interface IPostOrderRequestSuccess {
  readonly type: typeof POST_ORDER_REQUEST_SUCCESS;
  ingredientsIDs: Array<string>;
  orderNumber: number;
}
export interface IPostOrderRequestFailed {
  readonly type: typeof POST_ORDER_REQUEST_FAILED;
}
export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderRequestSuccess {
  readonly type: typeof GET_ORDER_REQUEST_SUCCESS;
  order: TOrder;
}
export interface IGetOrderRequestFailed {
  readonly type: typeof GET_ORDER_REQUEST_FAILED;
}
export interface IResetOrderNumber {
  readonly type: typeof RESET_ORDER_NUMBER;
}

export type TOrderDetailsActions =
  IPostOrderRequest |
  IPostOrderRequestSuccess |
  IPostOrderRequestFailed |
  IGetOrderRequest |
  IGetOrderRequestSuccess |
  IGetOrderRequestFailed |
  IResetOrderNumber;

export const postOrder: AppThunk = (ingredientsIDs: TIngredientsIDs) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: POST_ORDER_REQUEST });

    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify({ 'ingredients': ingredientsIDs })
    }

    try {
      const res = await fetch(POST_ORDER_URL, opts);
      const data = await checkResponse(res);
      if (typeof data.order.number === 'number') {
        dispatch({ type: POST_ORDER_REQUEST_SUCCESS, orderNumber: data.order.number, ingredientsIDs: ingredientsIDs });
        dispatch({ type: CLEAR_CART_INGREDIENT })
      }
    }
    catch (e) {
      dispatch({ type: POST_ORDER_REQUEST_FAILED })
      console.log(e);
    }
  }

function isOrder(obj: any): obj is TOrder {
  return obj
}

export const getOrder: AppThunk = (orderNumber: string) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: GET_ORDER_REQUEST });

    const opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }

    try {
      const res = await fetch(`${GET_ORDER_URL}/${orderNumber}`, opts);
      const data = await checkResponse(res);
      if (isOrder(data.orders[0])) {
        dispatch({ type: GET_ORDER_REQUEST_SUCCESS, order: data.orders[0] });
      }
    }
    catch (e) {
      dispatch({ type: POST_ORDER_REQUEST_FAILED })
      console.log(e);
    }
  }
