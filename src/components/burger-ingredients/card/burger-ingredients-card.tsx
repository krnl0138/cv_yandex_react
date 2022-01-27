import styles from './burger-ingredients-card.module.scss';
import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../../types/hooks';
import { useDrag } from 'react-dnd';
import { TIngredient } from '../../../types/types';
import { getBreakpoints } from '../../../utils/helpers';
import { addCartIngredientBun, ADD_CART_INGREDIENT } from '../../../services/actions/cart';

type TCardProps = {
  item: TIngredient;
  openDetails: () => void;
  cyData: number;
};

export default function Card({ item, openDetails, cyData }: TCardProps): JSX.Element {
  const dispatch = useDispatch();

  const { isSmallScreen } = getBreakpoints();
  const cartIngredients = useSelector(store => store.cart.cartIngredients);
  const buns = useSelector(store => store.cart.bunIngredients);
  const counter = [...cartIngredients, ...buns].filter(el => el._id === item._id).length;

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: item,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [, bunRef] = useDrag({
    type: 'bun',
    item: item,
  });

  const addToCart = () => {
    const ingredient = item;
    if (ingredient.type === 'bun') {
      dispatch(addCartIngredientBun(ingredient));
    }
    if (ingredient.type === 'main' || ingredient.type === 'sauce') {
      dispatch({ type: ADD_CART_INGREDIENT, ingredient });
    }
    return;
  };

  return (
    <div
      ref={item.type === 'bun' ? bunRef : ref}
      className={`${styles.card} pl-2 pr-2`}
      onClick={isSmallScreen ? addToCart : openDetails}
      key={item._id}
      style={{ opacity }}
      data-cy={
        item.type === 'bun'
          ? `card-bun-${cyData}`
          : item.type === 'main'
          ? `card-main-${cyData}`
          : `card-sauce-${cyData}`
      }
    >
      {counter > 0 && (
        <Counter count={item.type === 'bun' ? counter + 1 : counter} size="default" />
      )}

      {isSmallScreen && (
        <div className={styles.button_modal} onClick={openDetails}>
          <p className={styles.button_modal_value}>?</p>
        </div>
      )}

      <img className="p-2 pb-4" src={item.image} alt={item.name} />
      <span className={styles.price}>
        <p className="text text_type_digits-default mr-2">{item.price}</p>
        <CurrencyIcon type="primary" />
      </span>
      <p className="text text_type_main-default pb-5 pt-5" style={{ fontWeight: 700 }}>
        {item.name}
      </p>
    </div>
  );
}
function dispatch(arg0: { type: any; ingredient: any }) {
  throw new Error('Function not implemented.');
}
