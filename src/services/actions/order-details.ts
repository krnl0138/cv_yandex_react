import { POST_ORDER_URL, GET_ORDER_URL } from '../../utils/api-urls';
import { CLEAR_CART_INGREDIENT } from './cart';

import { getCookie } from '../../utils/cookies';
import { checkResponse } from '../../utils/helpers';

import { TIngredientsIDs } from '../../types/types';
import { Dispatch } from 'redux';

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export const RESET_ORDER_NUMBER = 'RESET_ORDER_NUMBER';

export const postOrder = (ingredientsIDs: TIngredientsIDs) => {
  return function (dispatch: Dispatch) {
    dispatch({ type: POST_ORDER_REQUEST });

    fetch(POST_ORDER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify({ 'ingredients': ingredientsIDs })
    })
      .then(res => checkResponse(res))
      .then(res => {
        dispatch({ type: POST_ORDER_SUCCESS, orderNumber: res.order.number, ingredientsIDs: ingredientsIDs });
        dispatch({ type: CLEAR_CART_INGREDIENT })
      })
      .catch(e => {
        dispatch({ type: POST_ORDER_FAILED })
        console.log(e);
      });
  }
};

// Should be Pick<TOrder, 'orderNumber'> or string ????
export const getOrder = (orderNumber: string) => {
  return async function (dispatch: Dispatch) {
    dispatch({ type: 'GET_ORDER_REQUEST' });

    const opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }

    await fetch(`${GET_ORDER_URL}/${orderNumber}`, opts)
      .then(res => checkResponse(res))
      .then(data => {
        dispatch({ type: GET_ORDER_SUCCESS, order: data.orders[0] });
      })
      .catch(e => {
        dispatch({ type: POST_ORDER_FAILED })
        console.log(e);
      })
  }
}