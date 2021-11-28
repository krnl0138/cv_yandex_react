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

    const ordersToDisplay = 12;

    useEffect(() => {
        dispatch({ type: 'WS_CONNECTION_START', wsUrl: WS_ALL_ORDERS_URL });
    }, [dispatch]);

    useEffect(() => {
        if (!messages[messages.length - 1]) return;

        const parsedMessage = JSON.parse(messages[messages.length - 1]);
        setOrders(parsedMessage.orders);
        setTotal(parsedMessage.total);
        setTotalToday(parsedMessage.totalToday);
        
    }, [messages]);

    const onClick = (order) => {
        history.replace({ pathname: `/feed/${order.number}`, state: { background: location, order: order } })
        dispatch({ type: 'VISIBLE_ORDERS_DETAILS', value: true })
    }

    // Handling order numbers
    const [doneNumbers, setDoneNumbers] = useState([]);
    const [processNumbers, setProcessNumbers] = useState([]);

    const handleOrderNumbers = (numbers) => {
        let numbersByChunk;
        const content = []
        const chunk = 10;

        for (let i = 0; i < numbers.length; i += chunk) { // i: 0, 10, 20 ...
            numbersByChunk = numbers.slice(i, i + chunk) // each time holds every 10 els of the numbers array

            let toRenderByChunk = numbersByChunk.map((n, ind) => { // create a [10] elements array of jsx elements
                return (
                    <p key={ind} className={`${styles.ordersDone} text text_type_digits-default`}>
                        {n}
                    </p>
                )
            })

            content.push(toRenderByChunk); // [10]*n array of jsx elements
        }
        return content
    }

    useEffect(() => {
        if (!orders) return;

        const done = orders.filter(o => o.status === 'done').map(o => o.number);
        const d = handleOrderNumbers(done);
        setDoneNumbers([...d]);

        // Assuming 'pending' status is eq. to 'В работе'
        const process = orders.filter(o => o.status === 'pending').map(o => o.number);
        const p = handleOrderNumbers(process);
        setProcessNumbers([...p]);
        
    }, [orders]);

    return (
        orders ? (
            <div className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.orders}>
                        <p className={`${styles.feedHeading} text text_type_main-large mb-6`}>Лента заказов</p>
                        {orders.slice(0, ordersToDisplay).map(order => {
                            return (
                                <OrderElement onClick={() => onClick(order)} key={order._id} order={order} from='feed' />
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
                                    {(doneNumbers.length > 0)
                                        ? (
                                            doneNumbers.map((col, ind) => {
                                                return (
                                                    <div key={ind} className='mr-3'>
                                                        {col}
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

                                    {(processNumbers.length > 0)
                                        ? (
                                            processNumbers.map((col, ind) => {
                                                return (
                                                    <div key={ind} className='mr-3'>
                                                        {col}
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