import styles from './profile-orders.module.css';
import React, { useState, useCallback, useEffect } from 'react';
import { useHistory, useLocation, Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from '../../types/hooks';
import { logout } from '../../services/actions/auth/logout';
import { WS_USER_ORDERS_URL } from '../../utils/api-urls';

import Loader from '../../components/loader/loader';
import OrderElement from '../../components/order-element/order-element';
import { RootState } from '../../services/reducers';
import { TOrder } from '../../types/types';
import { VISIBLE_ORDERS_DETAILS } from '../../services/actions/modals';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/socket';

export default function ProfileOrders(): JSX.Element {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const messages = useSelector((store: RootState) => store.ws.messages);
    const [orders, setOrders] = useState<Array<TOrder>>([]);

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, wsUrl: WS_USER_ORDERS_URL })
        return () => {dispatch({ type: WS_CONNECTION_CLOSED })}
    }, [dispatch])

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage) return;

        const parsedMessage = JSON.parse(String(lastMessage));
        setOrders(() => parsedMessage.orders);

        console.log(parsedMessage.orders);
    }, [messages]);

    const onClick = (order: TOrder) => {
        history.replace({ pathname: `/profile/orders/${order.number}`, state: { background: location, order: order } })
        dispatch({ type: VISIBLE_ORDERS_DETAILS, value: true })
    }

    const onClickLogout = useCallback(() => {
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
                {!orders
                    ? (<Loader />)
                    : (
                        orders.slice(0).reverse().map((order, index) => { // for some reason returned reversed
                            return (
                                <OrderElement
                                    key={index}
                                    onClick={() => onClick(order)}
                                    order={order}
                                    from='profile'
                                />
                            )
                        })
                    )
                }
            </div>

        </div>
    )
}