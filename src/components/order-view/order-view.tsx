import styles from './order-view.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loader from '../loader/loader';

import moment from 'moment';
import 'moment/locale/ru';

import { getOrder } from '../../services/actions/order-details';

import { TIngredient, TOrder } from '../../types/types';
import { RootState } from '../../services/reducers';

interface IOrderViewProps {
    order?: TOrder;
    modal?: boolean;
}

export default function OrderView({ order, modal }: IOrderViewProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const { ingredientsData } = useSelector((store:RootState) => store.ingredients);
    const [ingredientsInOrder, setIngredientsInOrder] = useState<Array<TIngredient>>([]);
    const [doneWithIngredients, setDoneWithIngredients] = useState<boolean>(false);
    const [resultedOrder, setResultedOrder] = useState<TOrder>();
    
    //  if there is NO 'order' prop it stores a value from 'dispatch(getOrder(orderNumber))' call
    const orderNotFromProps = useSelector((store:RootState) => store.orderDetails.order) as TOrder;
    
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
        }
        
        setDoneWithIngredients(true);
    }, [ingredientsData])
    
    let orderNumber: string;
    if (location.pathname.startsWith('/profile/orders/')) {
        orderNumber = location.pathname.split('/')[3]; // e.g. '/profile/orders/3053'
    }
    if (location.pathname.startsWith('/feed/')) {
        orderNumber = location.pathname.split('/')[2]; // e.g. '/feed/3053'
    }

    useEffect(() => {
        if (!order) {
            dispatch(getOrder(orderNumber)); // change 'orderNotFromProps' variable
            return;
        }

        setResultedOrder({ ...resultedOrder, ...order })
        matchIngredientsFromOrder(order);
        setStatusVariables(order.status)
    }, [])
    
    useEffect(() => {
        // Если не было order в пропсах: 'orderNotFromProps' получена от сервера и обновлена в сторе
        if (order) return;
        if (Object.keys(orderNotFromProps).length === 0) return;
        
        setResultedOrder({ ...resultedOrder, ...orderNotFromProps });
        matchIngredientsFromOrder(orderNotFromProps)
        setStatusVariables(orderNotFromProps.status)
    }, [orderNotFromProps])
    
    // Handling order statuses
    const [status, setStatus] = useState({
        statusValue: '',
        statusColor: ''
    })

    const setStatusVariables = (s: string) => {
        if (s === 'done') {
            setStatus({statusValue: 'Выполнен', statusColor: 'statusDone'})
        }
        if (s === 'created') {
            setStatus({statusValue: 'Готовится', statusColor: 'statusInProgress'})
        }
        if (s === 'pending') {
            setStatus({statusValue: 'Отменен', statusColor: 'statusCancelled'})
        }
    }

    return (
        resultedOrder ? (
            <div className={modal ? styles.mainModal : styles.main}>
                <p className={`${styles.orderNumber} text text_type_digits-medium mb-10`} >#{resultedOrder.number}</p>
                <p className={` ${styles.orderName} text text_type_main-medium mb-5`}>{resultedOrder.name}</p>

                <p className={`${styles[status.statusColor]} text text_type_main-default mb-15`}>{status.statusValue}</p>

                <div className={` ${styles.orderContent} `} >
                    <p className='text text_type_main-medium mb-7'>Состав:</p>
                    <div className={` ${styles.orderIngredients} `}>

                        {doneWithIngredients
                            ? (ingredientsInOrder.map((ing, index) => {
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
                            : (<Loader />)}
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
        ) : (
            <Loader />
        )
    )
}