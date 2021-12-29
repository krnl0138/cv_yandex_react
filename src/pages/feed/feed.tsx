import styles from './feed.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../types/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { WS_ALL_ORDERS_URL } from '../../utils/api-urls';
import Loader from '../../components/loader/loader';
import OrderElement from '../../components/order-element/order-element';
import { TOrder } from '../../types/types';
import { VISIBLE_ORDERS_DETAILS } from '../../services/actions/modals';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/socket';

export default function Feed(): JSX.Element {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const ORDERS_TO_DISPLAY = 12;

    const messages = useSelector(store => store.ws.messages);
    const [orders, setOrders] = useState<Array<TOrder>>([]);
    const [total, setTotal] = useState(0);
    const [totalToday, setTotalToday] = useState(0);

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, wsUrl: WS_ALL_ORDERS_URL });
        return () => {dispatch({ type: WS_CONNECTION_CLOSED })}
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
        history.replace({ pathname: `/feed/${order.number}`, state: { background: location, order: order } })
        dispatch({ type: VISIBLE_ORDERS_DETAILS, value: true })
    }

    // Handling order numbers
    const [doneOrders, setDoneNumbers] = useState<Array<JSX.Element[]>>([]);
    const [processOrders, setProcessNumbers] = useState<Array<JSX.Element[]>>([]);

    const getOrdersByOrderNumbers = useCallback((orderNumbers: Array<string>): JSX.Element[][] => {
        const CHUNK_SIZE = 10;
        let orderNumbersChunk: Array<string>;
        const jsxMarkup: JSX.Element[][] = []

        for (let i = 0; i < orderNumbers.length; i += CHUNK_SIZE) { // i: 0, 10, 20 ...
            orderNumbersChunk = orderNumbers.slice(i, i + CHUNK_SIZE) // holds every ten els of 'orderNumbers'

            const jsxOrderNumbersChunk = orderNumbersChunk.map((n, ind) => { // create an array of ten jsx elements
                return (
                    <p key={ind} className={`${styles.ordersDone} text text_type_digits-default`}>
                        {n}
                    </p>
                )
            })

            jsxMarkup.push(jsxOrderNumbersChunk); // an array of jsx elements arrays 
        }
        return jsxMarkup;
    }, [])

    useEffect(() => {
        if (!orders) return;

        const handleOrderNumbers = (s: string, fn: (content: JSX.Element[][]) => void) => {
            const orderNumbersByStatus = orders.filter(o => o.status === s).map(o => o.number);
            const jsxMarkup = getOrdersByOrderNumbers(orderNumbersByStatus);
            fn([...jsxMarkup]);
        }
        
        handleOrderNumbers('done', setDoneNumbers);
        handleOrderNumbers('process', setProcessNumbers);
    }, [orders, getOrdersByOrderNumbers]);
    
    return (
        !orders 
        ? (<Loader />)
        : (
            <div className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.orders}>
                        <p className={`${styles.feedHeading} text text_type_main-large mb-6`}>Лента заказов</p>
                        {orders.slice(0, ORDERS_TO_DISPLAY).map((order, index) => {
                            return (
                                <OrderElement
                                    key={index}
                                    onClick={() => onClick(order)}
                                    order={order}
                                    from='feed' 
                                />
                            )
                        })}
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.stats}>
                        <div className={styles.ordersStats}>

                            <div className={styles.ordersReady}>
                                <p className="text text_type_main-medium mb-5">Готовы:</p>

                                <div className={styles.wrapper}>
                                    {(doneOrders.length > 0)
                                        ? (
                                            doneOrders.map((column, ind) => {
                                                return (
                                                    <div key={ind} className='mr-3'>
                                                        {column}
                                                    </div>
                                                )
                                            })
                                        )
                                        : (<Loader />)
                                    }
                                </div>
                            </div>

                            <div className={styles.ordersPrep}>
                                <p className="text text_type_main-medium mb-5">В работе:</p>

                                <div className={styles.wrapper}>

                                    {(processOrders.length > 0)
                                        ? (
                                            processOrders.map((column, ind) => {
                                                return (
                                                    <div key={ind} className='mr-3'>
                                                        {column}
                                                    </div>
                                                )
                                            })
                                        )
                                        : (
                                            // Populate fake data if no orders with status 'pending'
                                            <div>
                                                <p key='1' className='text text_type_digits-default'>034523</p>
                                                <p key='2' className='text text_type_digits-default'>034524</p>
                                                <p key='3' className='text text_type_digits-default'>034525</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className={styles.ordersAllTime}>
                            <p className="text text_type_main-medium mb-3">Выполнено за все время:</p>
                            <p className={`${styles.ordersAllTimeNumber} text text_type_digits-large`}>{total}</p>
                        </div>

                        <div className={styles.ordersToday}>
                            <p className="text text_type_main-medium mb-3">Выполнено за сегодня:</p>
                            <p className={`${styles.ordersTodayNumber} text text_type_digits-large`}>{totalToday}</p>
                        </div>
                    </div>

                </div>
            </div>
        ) 
    )
}