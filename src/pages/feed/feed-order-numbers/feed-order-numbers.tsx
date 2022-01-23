import Loader from '../../../components/loader/loader';
import styles from './feed-order-numbers.module.scss';
import React from 'react';

interface IFeedOrderNumbers {
  status: 'done' | 'pending';
  ordersMarkup: JSX.Element[][];
}

export const FeedOrderNumbers = ({ ordersMarkup, status }: IFeedOrderNumbers): JSX.Element => {
  const renderOrderMarkup = (): JSX.Element[] => {
    return ordersMarkup.map((column, ind) => {
      return (
        <div key={ind} className="mr-3">
          {column}
        </div>
      );
    });
  };

  if (status === 'done') {
    return (
      <div className={styles.ordersReady}>
        <p className="text text_type_main-medium mb-5">Готовы:</p>

        <div className={styles.wrapper}>
          {ordersMarkup.length > 0 ? renderOrderMarkup() : <Loader />}
        </div>
      </div>
    );
  } else if (status === 'pending') {
    return (
      <div className={styles.ordersPrep}>
        <p className="text text_type_main-medium mb-5">В работе:</p>

        <div className={styles.wrapper}>
          {ordersMarkup.length > 0 ? (
            renderOrderMarkup()
          ) : (
            // Populate fake data if no orders with status 'pending'
            <div>
              <p key="1" className="text text_type_digits-default">
                034523
              </p>
              <p key="2" className="text text_type_digits-default">
                034524
              </p>
              <p key="3" className="text text_type_digits-default">
                034525
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    throw new Error('wrong status for FeedOrderNumbers component was given');
  }
};
