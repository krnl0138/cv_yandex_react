import { POST_ORDER_URL, GET_ORDER_URL } from '../../utils/api-urls';
import { CLEAR_CART_INGREDIENT } from './cart';

import { getCookie } from '../../utils/cookies';
import { checkResponse } from '../../utils/helpers';

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER';

export const postOrder = (ingredientsIDs) => {
  return function (dispatch) {
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

export const getOrder = (orderNumber) => {
  return async function (dispatch) {
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