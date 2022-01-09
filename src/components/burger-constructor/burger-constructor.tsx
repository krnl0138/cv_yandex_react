import styles from './burger-constructor.module.scss';
import React from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../types/hooks';
import { useDrop } from 'react-dnd';
import { useHistory, useLocation } from 'react-router-dom';
import { postOrder } from '../../services/actions/order-details';
import { VISIBLE_ORDER_DETAILS } from '../../services/actions/modals';
import { ADD_CART_INGREDIENT, ADD_CART_INGREDIENT_BUN } from '../../services/actions/cart';
import { BurgerConstructorMiddle } from './burger-constructor-middle/burger-constructor-middle';
import { BurgerConstructorBun } from './burger-constructor-bun/burger-constructor-bun';

export default function BurgerConstructor(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector(store => store.user);
  const cartIngredients = useSelector(store => store.cart.сartIngredients);
  const ingredientsIDs = cartIngredients.map(item => item._id);
  const bun = useSelector(store => store.cart.bunIngredients[0]);

  const orderCost = bun
    ? [bun, bun, ...cartIngredients].reduce((acc, ing) => acc += ing.price, 0)
    : cartIngredients.reduce((acc, ing) => acc += ing.price, 0);


  const orderBurger = () => {
    if (!user.username) {
      return history.push({ pathname: '/login' });
    }

    if (bun && cartIngredients.length !== 0) {
      dispatch({ type: VISIBLE_ORDER_DETAILS, value: true })
      dispatch(postOrder(ingredientsIDs));
      history.replace({ pathname: '/', state: { from: location.pathname } });
    }
  }

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      dispatch({ type: ADD_CART_INGREDIENT, ingredient })
    }
  });

  const [, bunDropTop] = useDrop({
    accept: 'bun',
    drop(ingredient) {
      dispatch({ type: ADD_CART_INGREDIENT_BUN, ingredient })
    }
  });

  const [, bunDropBottom] = useDrop({
    accept: 'bun',
    drop(ingredient) {
      dispatch({ type: ADD_CART_INGREDIENT_BUN, ingredient })
    }
  });

  return (
    <section className={`${styles.main} mt-25 mr-10`}>

      <div className={`${styles.constructor} mb-4`} >
        <BurgerConstructorBun bun={bun} type='top' bunDropRef={bunDropTop}/>

        <div className={styles.middle} ref={dropTarget} >
          {cartIngredients.map((ingredient, index) => {
            return (
              <div className={styles.middleIngredients} key={`${ingredient._id}${index}`} >
                <BurgerConstructorMiddle item={ingredient} index={index} />
              </div>
            )
          })
          }
        </div>

        <BurgerConstructorBun bun={bun} type='bottom' bunDropRef={bunDropBottom}/>
      </div>

      <div className={styles.orderSection}>
        <span className={`${styles.price} m-5`}>
          <p className='text text_type_digits-medium mr-2'>{orderCost}</p>
          <CurrencyIcon type='primary' />
        </span>
        <Button type='primary'
          size='medium'
          onClick={orderBurger}>
          Оформить заказ
        </Button>
      </div>

    </section>
  )
}