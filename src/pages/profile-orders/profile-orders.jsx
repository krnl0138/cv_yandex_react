import styles from './profile-orders.module.css';
import { useState, useCallback, useEffect } from 'react';
import { useHistory, useLocation, Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/actions/auth';
import { WS_USER_ORDERS_URL } from '../../utils/api-urls';

import Loader from '../../components/loader/loader';
import OrderElement from '../../components/order-element/order-element';

export default function ProfileOrders() {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const messages = useSelector(store => store.ws.messages);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        dispatch({ type: 'WS_CONNECTION_START', wsUrl: WS_USER_ORDERS_URL })
    }, [dispatch])

    useEffect(() => {
        if (!messages[messages.length - 1]) return; 
        
        const parsedMessage = JSON.parse(messages[messages.length - 1]);
        setOrders(parsedMessage.orders);
    }, [messages]);

    const onClick = (order) => {
        history.replace({ pathname: `/profile/orders/${order.number}`, state: { background: location, order: order } })
        dispatch({ type: 'VISIBLE_ORDERS_DETAILS', value: true })
    }

    const onClickLogout = useCallback((e) => {
        dispatch(logout());
    }, [dispatch]);

    return (
        <div className={styles.main}>
            <div className={styles.left}>

                <nav className={styles.nav}>
                    <NavLink
                        exact to={{ pathname: '/profile' }}
                        activeClassName={styles.activeLink}
                        className={`text text_type_main-medium text-color-inactive ${styles.navChild}`}>
                        Профиль
                    </NavLink>

                    <NavLink
                        exact to={{ pathname: '/profile/orders' }}
                        activeClassName={styles.activeLink}
                        className={`text text_type_main-medium text-color-inactive ${styles.navChild}`}>
                        История заказов
                    </NavLink>

                    <Link
                        onClick={onClickLogout}
                        to={{ pathname: '/' }}
                        className={`text text_type_main-medium text-color-inactive ${styles.navChild}`}>
                        Выход
                    </Link>

                    <p className={`text text_type_main-small text_color_inactive ${styles.navParagraph}`}>В этом разделе вы можете изменить свои персональные данные</p>
                </nav>
            </div>

            <div className={styles.right}>
                {orders ? (
                    orders.slice(0).reverse().map(order => { // for some reason server returns it reversed, weird
                        return (
                            <OrderElement onClick={() => onClick(order)} key={order._id} order={order} from='profile' />
                        )
                    })
                )
                    : (<Loader />)
                }
            </div>

        </div>
    )
}