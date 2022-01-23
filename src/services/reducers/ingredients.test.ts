import { ingredientsReducer as reducer } from './ingredients';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_REQUEST_SUCCESS,
  GET_INGREDIENTS_REQUEST_ERROR,
} from '../actions/ingredients';

describe('order details reducer', () => {
  const initialState = {
    ingredientsData: [],
    isLoading: false,
    hasError: false,
  };

  it('should return initial state', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should check the request to get ingredients has started', () => {
    expect(
      reducer(initialState, {
        type: GET_INGREDIENTS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should check the request to get ingredients has failed', () => {
    expect(
      reducer(initialState, {
        type: GET_INGREDIENTS_REQUEST_ERROR,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      hasError: true,
    });
  });

  it('should check the request to get ingredients has succeded', () => {
    expect(
      reducer(initialState, {
        type: GET_INGREDIENTS_REQUEST_SUCCESS,
        ingredientsData: [],
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      ingredientsData: [],
    });
  });
});
