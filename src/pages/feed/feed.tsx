import styles from './feed.module.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../types/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { WS_ALL_ORDERS_URL } from '../../utils/api-urls';
import Loader from '../../components/loader/loader';
import OrderElement from '../../components/order-element/order-element';
import { TOrder } from '../../types/types';
import { SET_VISIBLE_ORDERS_DETAILS } from '../../services/actions/modals';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/socket';
import { FeedOrderNumbersOverall } from './feed-order-numbers-overall/feed-order-numbers-overall';
import { FeedOrderNumbers } from './feed-order-numbers/feed-order-numbers';

export default function Feed(): JSX.Element {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const ORDERS_TO_DISPLAY = 12;

  const messages = useSelector(store => store.ws.messages);
  const [orders, setOrders] = useState<Array<TOrder>>([]);
  const [total, setTotal] = useState(0);
  const [totalToday, setTotalToday] = useState(0);
  const [doneOrders, setDoneNumbers] = useState<Array<JSX.Element[]>>([]);
  const [processOrders, setProcessNumbers] = useState<Array<JSX.Element[]>>([]);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, wsUrl: WS_ALL_ORDERS_URL });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;

    const parsedMessage = JSON.parse(String(lastMessage));
    setOrders(parsedMessage.orders);
    setTotal(parsedMessage.total);
    setTotalToday(parsedMessage.totalToday);
  }, [messages]);

  const onClick = (order: TOrder) => {
    history.replace({
      pathname: `/feed/${order.number}`,
      state: { background: location, order: order },
    });
    dispatch({ type: SET_VISIBLE_ORDERS_DETAILS, value: true });
  };

  // Handling order numbers

  const getJSXMarkup = useCallback((orderNumbers: Array<string>): JSX.Element[][] => {
    const CHUNK_SIZE = 5;
    const COLUMNS = 3;
    let orderNumbersChunk: Array<string>;
    const jsxMarkup: JSX.Element[][] = [];

    if (orderNumbers.length === 0) return jsxMarkup;

    for (let i = 0; i < COLUMNS * CHUNK_SIZE; i += CHUNK_SIZE) {
      // i: 0, 10, 20 ...
      orderNumbersChunk = orderNumbers.slice(i, i + CHUNK_SIZE); // holds every ten els of 'orderNumbers'

      const jsxOrderNumbersChunk = orderNumbersChunk.map((n, ind) => {
        // create an array of ten jsx elements
        return (
          <p key={ind} className={`${styles.ordersDone} text text_type_digits-default`}>
            {n}
          </p>
        );
      });

      jsxMarkup.push(jsxOrderNumbersChunk); // an array of jsx elements arrays
    }
    return jsxMarkup;
  }, []);

  useEffect(() => {
    if (!orders) return;

    const handleOrderNumbers = (s: string, fn: (content: JSX.Element[][]) => void) => {
      const orderNumbersByStatus = orders.filter(o => o.status === s).map(o => o.number.toString());
      const jsxMarkup = getJSXMarkup(orderNumbersByStatus);
      fn([...jsxMarkup]);
    };

    handleOrderNumbers('done', setDoneNumbers);
    handleOrderNumbers('process', setProcessNumbers);
  }, [orders, getJSXMarkup]);

  return !orders ? (
    <Loader />
  ) : (
    <div className={styles.main}>
      <div className={styles.left}>
        <p className={`${styles.feedHeading} text text_type_main-large mb-3 mt-9`}>Лента заказов</p>
        <div className={styles.orders}>
          {orders.slice(0, ORDERS_TO_DISPLAY).map((order, index) => {
            return (
              <div key={index} data-cy={`feed-order-${index}`}>
                <OrderElement onClick={() => onClick(order)} order={order} from="feed" />
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.stats}>
          <div className={styles.ordersStats}>
            <FeedOrderNumbers status="done" ordersMarkup={doneOrders} />
            <FeedOrderNumbers status="pending" ordersMarkup={processOrders} />
          </div>

          <FeedOrderNumbersOverall period={'allTime'} quantity={total} />
          <FeedOrderNumbersOverall period={'today'} quantity={totalToday} />
        </div>
      </div>
    </div>
  );
}
