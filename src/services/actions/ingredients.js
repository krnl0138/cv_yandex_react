import { GET_INGREDIENTS_URL } from '../../utils/api-urls';
import { checkResponse } from '../../utils/helpers';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export function getIngredients() {

  return async function (dispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });

    try {
      const res = await fetch(GET_INGREDIENTS_URL);
      const data = await checkResponse(res);
      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data.data })
    } catch (e) {
      dispatch({ type: GET_INGREDIENTS_ERROR });
      console.log(e);
    }
  }
};