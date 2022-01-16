import styles from './feed-order-numbers-overall.module.scss'
import React from 'react';

interface IFeedOrderNumbersOverall {
    period: 'today' | 'allTime';
    quantity: number;
}

export const FeedOrderNumbersOverall = ({ quantity, period }: IFeedOrderNumbersOverall): JSX.Element => {

    if (period === 'today') {
        return (
            <div className={styles.ordersToday}>
                <p className="text text_type_main-medium mb-3">Выполнено за сегодня:</p>
                <p className={`${styles.ordersTodayNumber} text text_type_digits-large`}>{quantity}</p>
            </div>
        )
    } else if (period === 'allTime') {
        return (
            <div className={styles.ordersAllTime}>
                <p className="text text_type_main-medium mb-3">Выполнено за все время:</p>
                <p className={`${styles.ordersAllTimeNumber} text text_type_digits-large`}>{quantity}</p>
            </div>
        )
    } else {
        throw new Error('Not correct period was given');
    }
    
}