import { modalsReducer as reducer } from './modals';
import {
  SET_VISIBLE_ORDER_DETAILS,
  SET_VISIBLE_INGREDIENT_DETAILS,
  SET_VISIBLE_ORDERS_DETAILS,
} from '../actions/modals';

describe('order details reducer', () => {
  const initialState = {
    visibleOrderDetails: false,
    visibleIngredientDetails: false,
    visibleOrdersDetails: false,
  };

  it('should return initial state', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should set visible order details modal', () => {
    expect(
      reducer(initialState, {
        type: SET_VISIBLE_ORDER_DETAILS,
        value: true,
      })
    ).toEqual({
      ...initialState,
      visibleOrderDetails: true,
    });
  });
  it('should set hidden order details modal', () => {
    expect(
      reducer(initialState, {
        type: SET_VISIBLE_ORDER_DETAILS,
        value: false,
      })
    ).toEqual({
      ...initialState,
      visibleOrderDetails: false,
    });
  });

  it('should set visible order details modal', () => {
    expect(
      reducer(initialState, {
        type: SET_VISIBLE_INGREDIENT_DETAILS,
        value: true,
      })
    ).toEqual({
      ...initialState,
      visibleIngredientDetails: true,
    });
  });
  it('should set hidden order details modal', () => {
    expect(
      reducer(initialState, {
        type: SET_VISIBLE_INGREDIENT_DETAILS,
        value: false,
      })
    ).toEqual({
      ...initialState,
      visibleIngredientDetails: false,
    });
  });

  it('should set visible orders modal', () => {
    expect(
      reducer(initialState, {
        type: SET_VISIBLE_ORDERS_DETAILS,
        value: true,
      })
    ).toEqual({
      ...initialState,
      visibleOrdersDetails: true,
    });
  });
  it('should set hidden orders modal', () => {
    expect(
      reducer(initialState, {
        type: SET_VISIBLE_ORDERS_DETAILS,
        value: false,
      })
    ).toEqual({
      ...initialState,
      visibleOrdersDetails: false,
    });
  });
});
