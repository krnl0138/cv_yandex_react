import styles from './feed.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { WS_ALL_ORDERS_URL } from '../../utils/api-urls';
import Loader from '../../components/loader/loader';
import OrderElement from '../../components/order-element/order-element';

export default function Feed() {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const messages = useSelector(store => store.ws.messages);
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalToday, setTotalToday] = useState(0);

    useEffect(() => {
        dispatch({ type: 'WS_CONNECTION_START', wsUrl: WS_ALL_ORDERS_URL });
    }, [dispatch]);

    useEffect(() => {
        if (messages[messages.length - 1]) {
            const parsedMessage = JSON.parse(messages[messages.length - 1]);
            setOrders(parsedMessage.orders);
            setTotal(parsedMessage.total);
            setTotalToday(parsedMessage.totalToday);
        }
    }, [messages]);

    const onClick = (order) => {
        history.replace({ pathname: `/feed/${order.number}`, state: { background: location, order: order } })
        dispatch({ type: 'VISIBLE_ORDERS_DETAILS', value: true })
    }

    return (
        orders ? (
            <div className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.orders}>
                        <p className={`${styles.feedHeading} text text_type_main-large mb-6`}>Лента заказов</p>
                        {orders.slice(0, 3).map(order => {
                            return (
                                <OrderElement onClick={() => onClick(order)} key={order._id} order={order} from='feed' />
                            )
                        })}
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.stats}>
                        <div className={styles.ordersStats}>

                            {orders.find(order => order.status === 'done') &&
                                <div className={styles.ordersReady}>
                                    <p className="text text_type_main-medium mb-5">Готовы:</p>
                                    {orders.filter(order => order.status === 'done').slice(0, 10).map(order => {
                                        return (
                                            <p key={order._id} className={`${styles.ordersDone} text text_type_digits-default`}>
                                                {order.number}
                                            </p>
                                        )
                                    })}
                                </div>
                            }

                            <div className={styles.ordersPrep}>
                                <p className="text text_type_main-medium mb-5">В работе:</p>
                                <p key='1' className='text text_type_digits-default'>034523</p>
                                <p key='2' className='text text_type_digits-default'>034524</p>
                                <p key='3' className='text text_type_digits-default'>034525</p>
                                {orders.filter(order => order.status === 'in process').slice(0, 10).map(order => {
                                    return (
                                        <p key={order._id} className={`text text_type_digits-default`}>{order.number}</p>
                                    )
                                })}
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