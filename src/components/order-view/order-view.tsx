import styles from './order-view.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from '../../types/hooks';

import { useLocation } from 'react-router-dom';
import Loader from '../loader/loader';

import moment from 'moment';
import 'moment/locale/ru';

import { getOrder } from '../../services/actions/order-details';

import { TIngredient, TOrder } from '../../types/types';

interface IOrderViewProps {
    order?: TOrder;
    modal?: boolean;
}

export default function OrderView({ order, modal }: IOrderViewProps): JSX.Element {
    const location = useLocation();
    const dispatch = useDispatch();
    const { ingredientsData } = useSelector(store => store.ingredients);
    const [ingredientsInOrder, setIngredientsInOrder] = useState<Array<TIngredient>>([]);
    const [resultedOrder, setResultedOrder] = useState<TOrder>();
    const [doneWithIngredients, setDoneWithIngredients] = useState(false);
    const [status, setStatus] = useState({
        value: '',
        color: ''
    })

    // Handling order statuses
    const matchOrderStatus = useCallback((s: string) => {
        if (s === 'done') {
            setStatus({value: 'Выполнен', color: 'statusDone'})
            return;
        }
        if (s === 'created') {
            setStatus({value: 'Готовится', color: 'statusInProgress'})
            return;
        }
        if (s === 'pending') {
            setStatus({value: 'Отменен', color: 'statusCancelled'})
            return;
        }
        throw new Error('status value is not valid')
    }, [])

    //  if there is NO 'order' prop it stores a value from 'dispatch(getOrder(orderNumber))' call
    const orderIfNoProps = useSelector(store => store.orderDetails.order) as TOrder;

    const matchIngredientsFromOrder = useCallback((order: TOrder) => {
        const matchedIngs: Array<TIngredient> = [];

        order.ingredients.forEach(orderIng => {
            const matched = ingredientsData.find(dataIng => dataIng._id === orderIng);
            if (matched !== undefined) {
                matchedIngs.push(matched);
            }
        })

        if (ingredientsInOrder.length !== matchedIngs.length) {
            setIngredientsInOrder([...ingredientsInOrder, ...matchedIngs]);
            setDoneWithIngredients(true);
        }
    }, [ingredientsData, ingredientsInOrder]);

    // let orderNumber = '';
    const getOrderNumberFromLocation = useCallback(() => {
        const l = location.pathname;
        if (l.startsWith('/profile/orders/')) {
            return l.split('/')[3]; // e.g. '/profile/orders/3053'
        }
        if (l.startsWith('/feed/')) {
            return l.split('/')[2]; // e.g. '/feed/3053'
        }
        throw new Error('location.pathname is not in orders or feed')
    }, [location.pathname]);

    useEffect(() => {
        if (!order) {
            const orderNumber = getOrderNumberFromLocation();
            dispatch(getOrder(orderNumber)); // change 'orderIfNoProps' variable
            return;
        }

        setResultedOrder(resultedOrder => ({ ...resultedOrder, ...order }))
        matchIngredientsFromOrder(order);
        matchOrderStatus(order.status)
    }, [order, dispatch, matchIngredientsFromOrder, matchOrderStatus, getOrderNumberFromLocation])

    useEffect(() => {
        if (order || Object.keys(orderIfNoProps).length === 0) return;

        // Если не было order в пропсах: 'orderIfNoProps' получена от сервера и обновлена в сторе
        setResultedOrder(resultedOrder => ({ ...resultedOrder, ...orderIfNoProps }))
        matchIngredientsFromOrder(orderIfNoProps)
        matchOrderStatus(orderIfNoProps.status)
    }, [order, orderIfNoProps, matchIngredientsFromOrder, matchOrderStatus])


    return (
        !resultedOrder
            ? (<Loader />)
            : (
                <div className={modal ? styles.mainModal : styles.main}>
                    <p className={`${styles.orderNumber} text text_type_digits-medium mb-10`} >#{resultedOrder.number}</p>
                    <p className={` ${styles.orderName} text text_type_main-medium mb-5`}>{resultedOrder.name}</p>

                    <p className={`${styles[status.color]} text text_type_main-default mb-15`}>{status.value}</p>

                    <div className={` ${styles.orderContent} `} >
                        <p className='text text_type_main-medium mb-7'>Состав:</p>
                        <div className={` ${styles.orderIngredients} `}>

                            {!doneWithIngredients
                                ? (<Loader />)
                                : (ingredientsInOrder.map((ing, index) => {
                                    return (
                                        <div className={` ${styles.orderIngredientRow} mb-1`} key={index}>

                                            <div className={styles.ingIconSpan}>
                                                <img src={ing.image_mobile} alt="" className={`${styles.ingIcon}`} />
                                            </div>

                                            <p className={`${styles.ingName} text text_type_main-default`}>{ing.name}</p>

                                            <span className={styles.ingValue}>
                                                <p className={`text text_type_digits-default mr-3`}>1x {ing.price}</p>
                                                <CurrencyIcon type="primary" />
                                            </span>
                                        </div>
                                    )
                                }))
                            }
                        </div>
                    </div>

                    <span className={`${styles.row} mt-10`}>
                        <p className={`${styles.orderDate} text text_type_main-default text_color_inactive`}>{moment(resultedOrder.createdAt).calendar()} i-GMT+3</p>
                        <span className={styles.orderValue}>
                            <p className="text text_type_digits-default mr-3">
                                {ingredientsInOrder.reduce((acc, ing) => {
                                    return acc += ing.price
                                }, 0)}
                            </p>
                            <CurrencyIcon type='primary' />
                        </span>
                    </span>
                </div>
            )
    )
}