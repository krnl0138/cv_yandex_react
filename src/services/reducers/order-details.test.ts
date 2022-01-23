import { orderDetailsReducer as reducer } from './order-details';
import {
  POST_ORDER_REQUEST,
  POST_ORDER_REQUEST_SUCCESS,
  POST_ORDER_REQUEST_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_REQUEST_SUCCESS,
  GET_ORDER_REQUEST_FAILED,
  RESET_ORDER_NUMBER,
} from '../actions/order-details';
import { orderTestExample } from '../../utils/tests-data';

describe('order details reducer', () => {
  const initialState = {
    ingredientsIDs: [],
    orderNumber: null,
    isLoading: false,
    hasError: false,
    order: {},
  };

  it('should return initial state', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should check the request to post an order has started', () => {
    expect(
      reducer(initialState, {
        type: POST_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should check the request to post an order has failed', () => {
    expect(
      reducer(initialState, {
        type: POST_ORDER_REQUEST_FAILED,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      hasError: true,
    });
  });

  it('should check the request to post an order has succeded', () => {
    expect(
      reducer(initialState, {
        type: POST_ORDER_REQUEST_SUCCESS,
        orderNumber: 0,
        ingredientsIDs: [],
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      hasError: false,
      orderNumber: 0,
      ingredientsIDs: [],
    });
  });

  it('should check the request to get an order has started', () => {
    expect(
      reducer(initialState, {
        type: GET_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should check the request to get an order has failed', () => {
    expect(
      reducer(initialState, {
        type: GET_ORDER_REQUEST_FAILED,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      hasError: true,
    });
  });

  it('should check the request to get an order has succeded', () => {
    expect(
      reducer(initialState, {
        type: GET_ORDER_REQUEST_SUCCESS,
        order: orderTestExample,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      hasError: false,
      order: orderTestExample,
    });
  });

  it('should reset order number', () => {
    expect(
      reducer(initialState, {
        type: RESET_ORDER_NUMBER,
      })
    ).toEqual({
      ...initialState,
      orderNumber: null,
    });
  });
});
