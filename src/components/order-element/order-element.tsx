import styles from './order-element.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from '../../types/hooks';


import moment from 'moment';
import 'moment/locale/ru';

import Loader from '../loader/loader';
import { RootState } from '../../services/reducers';

import { TOrder, TIngredient } from '../../types/types';

interface IOrderElementProps {
    order: TOrder;
    onClick?: () => void;
    from?: string;
}

export default function OrderElement({ onClick, order, from }: IOrderElementProps): JSX.Element {
    const { ingredientsData } = useSelector((store: RootState) => store.ingredients);
    const [ingredientsInOrder, setIngredientsInOrder] = useState<Array<TIngredient>>([]);
    const [doneIngredients, setDoneIngredients] = useState(false);
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

    useEffect(() => {
        if (!order?.ingredients || !ingredientsData) return;

        if (order.status) {
            matchOrderStatus(order.status);
        } else {
            throw new Error('something is wrong with order.status value')
        }

        const matchedIngs: Array<TIngredient> = [];

        order.ingredients.forEach(orderIng => {
            const matched = ingredientsData.find((dataIng) => dataIng._id === orderIng);
            if (matched !== undefined) {
                matchedIngs.push(matched);
            }
        })

        if (ingredientsInOrder.length !== matchedIngs.length) {
            setIngredientsInOrder([...matchedIngs]);
            setDoneIngredients(true);
        }
    }, [ingredientsData, order.ingredients, ingredientsInOrder.length, order.status, matchOrderStatus]);

    return (
        <div className={styles.main} onClick={onClick}>
            <span className={styles.content}>

                <span className={`${styles.row} mt-3 mb-6`}>
                    <p className={`text text_type_digits-default`}>{order.number}</p>
                    <p className={`text text_type_main-default text_color_inactive`}>{moment(order.createdAt).calendar()} i-GMT+3</p>
                </span>

                <p className="text text_type_main-medium mb-4">{order.name}</p>

                {from === 'profile' &&
                    <p className={`${styles[status.color]} text text_type_main-default mb-4`}>{status.value}</p>
                }

                <span className={`${styles.row} mt-3 mb-5`}>
                    <span className={styles.icons}>
                        {!doneIngredients
                            ? (<Loader />)
                            : ingredientsInOrder.slice(0, 6).map((ing, index) => {
                                return (
                                    <span className={styles.ing} key={index}>
                                        {ingredientsInOrder.length > 6 && (
                                            <span className={`text text_type_digits-default ${styles.iconNumber}`}>+{ingredientsInOrder.length - 6}</span>
                                        )}
                        
                                        <img src={ing.image_mobile} alt="" className={`${styles.ingIcons}`} />
                                    </span>
                                )})
                            }
                    </span>

                    <span className={styles.value}>
                        <p className="text text_type_digits-default mr-2">
                            {ingredientsInOrder.reduce((acc, ing) => {
                                return acc += ing.price
                            }, 0)}
                        </p>
                        <CurrencyIcon type="primary" />
                    </span>
                </span>
            </span>
        </div>
    )
}