import { GET_INGREDIENTS_URL } from '../../utils/api-urls';
import { checkResponse } from '../../utils/helpers';
import { AppDispatch, AppThunk } from '../reducers';
import { TIngredient } from '../../types/types';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST' as const;
export const GET_INGREDIENTS_REQUEST_SUCCESS = 'GET_INGREDIENTS_REQUEST_SUCCESS' as const;
export const GET_INGREDIENTS_REQUEST_ERROR = 'GET_INGREDIENTS_REQUEST_ERROR' as const;

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsRequestSuccess {
  readonly type: typeof GET_INGREDIENTS_REQUEST_SUCCESS;
  readonly ingredientsData: ReadonlyArray<TIngredient>;
}

export interface IGetIngredientsRequestError {
  readonly type: typeof GET_INGREDIENTS_REQUEST_ERROR;
}

export type TIngredientsActions =
  | IGetIngredientsRequest
  | IGetIngredientsRequestSuccess
  | IGetIngredientsRequestError;

// not working for an array, is there a way to validate data?
function isIngArray(obj: any): obj is Array<TIngredient> {
  return obj;
}

export const getIngredients: AppThunk = () => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });

    try {
      const res = await fetch(GET_INGREDIENTS_URL);
      const data = await checkResponse(res);
      if (isIngArray(data.data)) {
        dispatch({ type: GET_INGREDIENTS_REQUEST_SUCCESS, ingredientsData: data.data });
      }
    } catch (e) {
      dispatch({ type: GET_INGREDIENTS_REQUEST_ERROR });
      console.log(e);
    }
  };
};
