import styles from './order-element.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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

type TStatus = {
    message: string;
    statusColor: string;
}

export default function OrderElement({ onClick, order, from }: IOrderElementProps) {
    const { ingredientsData } = useSelector((store: RootState) => store.ingredients);
    const [ingredientsInOrder, setIngredientsInOrder] = useState<Array<TIngredient>>([]);
    const [doneIngredients, setDoneIngredients] = useState(false);


    const status: TStatus = {
        message: '',
        statusColor: ''
    }
    if (order.status === 'done') {
        status.message = 'Выполнен'
        status.statusColor = 'statusDone';
    }
    if (order.status === 'created') {
        status.message = 'Готовится'
        status.statusColor = 'statusInProgress';
    }
    if (order.status === 'pending') {
        status.message = 'Отменен'
        status.statusColor = 'statusCancelled';
    }

    useEffect(() => {
        if (!order?.ingredients || !ingredientsData) return;

        const matchedIngs: Array<TIngredient> = [];

        order.ingredients.forEach(orderIng => {
            const matched = ingredientsData.find((dataIng) => dataIng._id === orderIng);
            if (matched !== undefined) {
                matchedIngs.push(matched);
            }
        })

        if (ingredientsInOrder.length !== matchedIngs.length) {
            setIngredientsInOrder([...ingredientsInOrder, ...matchedIngs]);
        }

        setDoneIngredients(true);
    }, [ingredientsData, order.ingredients, ingredientsInOrder]);

    return (
        <div className={styles.main} onClick={onClick}>
            <span className={styles.content}>

                <span className={`${styles.row} mt-3 mb-6`}>
                    <p className={`text text_type_digits-default`}>{order.number}</p>
                    <p className={`text text_type_main-default text_color_inactive`}>{moment(order.createdAt).calendar()} i-GMT+3</p>
                </span>

                <p className="text text_type_main-medium mb-4">{order.name}</p>

                {from === 'profile' &&
                    <p className={`${styles[status.statusColor]} text text_type_main-default mb-4`}>{status.message}</p>
                }

                <span className={`${styles.row} mt-3 mb-5`}>
                    <span className={styles.icons}>
                        {doneIngredients
                            ? ingredientsInOrder.slice(0, 6).map((ing, index) => {
                                return (
                                    <span className={styles.ing} key={index}>
                                        {ingredientsInOrder.length > 6 && (
                                            <span className={`text text_type_digits-default ${styles.iconNumber}`}>+{ingredientsInOrder.length - 6}</span>
                                        )}
                        
                                        <img src={ing.image_mobile} alt="" className={`${styles.ingIcons}`} />
                                    </span>
                                )})
                            : (<Loader />)}
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