import styles from './feed.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { WS_ALL_ORDERS_URL } from '../../utils/api-urls';
import Loader from '../../components/loader/loader';
import OrderElement from '../../components/order-element/order-element';
import { RootState } from '../../services/reducers';
import { TOrder } from '../../types/types';

export default function Feed() {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const ordersToDisplay = 12;

    const messages = useSelector((store: RootState) => store.ws.messages);
    const [orders, setOrders] = useState<Array<TOrder>>([]);
    const [total, setTotal] = useState(0);
    const [totalToday, setTotalToday] = useState(0);


    useEffect(() => {
        dispatch({ type: 'WS_CONNECTION_START', wsUrl: WS_ALL_ORDERS_URL });
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
        dispatch({ type: 'VISIBLE_ORDERS_DETAILS', value: true })
    }

    // Handling order numbers
    const [doneOrders, setDoneNumbers] = useState<Array<JSX.Element[]>>([]);
    const [processOrders, setProcessNumbers] = useState<Array<JSX.Element[]>>([]);

    const getOrdersByOrderNumbers = (orderNumbers: Array<string>): JSX.Element[][] => {
        let chunkNumbers: Array<string>;
        const content: JSX.Element[][] = []
        const chunk = 10;

        for (let i = 0; i < orderNumbers.length; i += chunk) { // i: 0, 10, 20 ...
            chunkNumbers = orderNumbers.slice(i, i + chunk) // holds every ten els of 'orderNumbers'

            let chunkRender = chunkNumbers.map((n, ind) => { // create an array of ten jsx elements
                return (
                    <p key={ind} className={`${styles.ordersDone} text text_type_digits-default`}>
                        {n}
                    </p>
                )
            })

            content.push(chunkRender); // an array of jsx elements arrays 
        }
        return content
    }

    useEffect(() => {
        if (!orders) return;

        const doneNumbers = orders.filter(o => o.status === 'done').map(o => o.number);
        const done = getOrdersByOrderNumbers(doneNumbers);
        setDoneNumbers([...done]);

        // Assuming 'pending' status is eq. to 'В работе'
        const processNumbers = orders.filter(o => o.status === 'pending').map(o => o.number);
        const process = getOrdersByOrderNumbers(processNumbers);
        setProcessNumbers([...process]);

    }, [orders]);

    return (
        orders ? (
            <div className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.orders}>
                        <p className={`${styles.feedHeading} text text_type_main-large mb-6`}>Лента заказов</p>
                        {orders.slice(0, ordersToDisplay).map((order, index) => {
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
        ) : (
            <Loader />
        )
    )
}