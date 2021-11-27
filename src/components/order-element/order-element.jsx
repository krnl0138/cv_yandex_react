import styles from './order-element.module.css';
import PropTypes from 'prop-types'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import moment from 'moment';
import 'moment/locale/ru';

import Loader from '../../components/loader/loader';

export default function OrderElement({ onClick, order, from }) {
    const { ingredientsData } = useSelector(store => store.ingredients);
    const [ingredientsInOrder, setIngredientsInOrder] = useState([]);
    const [doneIngredients, setDoneIngredients] = useState(false);

    let status, statusColor;
    if (order.status === 'done') {
        status = 'Выполнен'
        statusColor = 'statusDone';
    }
    if (order.status === 'created') {
        status = 'Выполнен'
        statusColor = 'statusInProgress';
    }
    if (order.status === 'pending') {
        status = 'Выполнен'
        statusColor = 'statusCancelled';
    }

    useEffect(() => {
        if (order?.ingredients && ingredientsData) {
            const matchedIngs = [];

            order.ingredients.forEach(orderIng => {
                const matched = ingredientsData.find(dataIng => dataIng._id === orderIng);
                matchedIngs.push(matched);
            })

            if (ingredientsInOrder.length !== matchedIngs.length) {
                setIngredientsInOrder([...ingredientsInOrder, ...matchedIngs]);
            }

            setDoneIngredients(true);
        }
    }, [ingredientsData]);

    return (
        <div className={styles.main} onClick={onClick}>
            <span className={styles.content}>

                <span className={`${styles.row} mt-3 mb-6`}>
                    <p className={`text text_type_digits-default`}>{order.number}</p>
                    <p className={`text text_type_main-default text_color_inactive`}>{moment(order.createdAt).calendar()} i-GMT+3</p> {/*2021-11-26T01:10:46.620Z*/}
                </span>

                <p className="text text_type_main-medium mb-4">{order.name}</p>

                {from === 'profile' && 
                    <p className={`${styles[statusColor]} text text_type_main-default mb-4`}>{status}</p>
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
                                )
                            })
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

OrderElement.propTypes = {
    status: PropTypes.string
}