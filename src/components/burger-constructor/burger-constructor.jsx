import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { GET_ORDER_INGREDIENTS_ID } from '../../services/actions/order-details';
import { ADD_CART_INGREDIENT, ADD_CART_INGREDIENT_BUN, DELETE_CART_INGREDIENT, MOVE_CART_INGREDIENT } from '../../services/actions/cart';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';

export default function BurgerConstructor({ openOrderDetails }) {
  const dispatch = useDispatch();

  const data = useSelector(state => state.cart.сartIngredients);
  const bun = useSelector(state => state.cart.bunIngredients[0]);

  const orderCost = bun ? [bun, bun, ...data].reduce((acc, ing) => acc += ing.price, 0)
    : data.reduce((acc, ing) => acc += ing.price, 0);

  const ingredientsIDs = data.map(item => item._id);

  const orderBurger = () => {
    if (bun && data.length !== 0) {
      openOrderDetails();
      dispatch({ type: GET_ORDER_INGREDIENTS_ID, ingredientsIDs: ingredientsIDs })
    }
  }

  const deleteIngredient = (index) => {
    dispatch({ type: DELETE_CART_INGREDIENT, ingredients: index })
  }

  const ConstructorElementMiddle = ({ item, index }) => {
    const [{ opacity }, dragRef] = useDrag({
      type: 'move',
      item: () => {
        return { item, index };
      },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    })

    const [{ padding }, dropRef] = useDrop({
      accept: 'move',
      drop(ingredients) {
        dispatch({ type: MOVE_CART_INGREDIENT, ingredients, dropIndex: index })
      },
      collect: monitor => ({
        padding: monitor.isOver()
      })
    });

    return (
      <div ref={dragRef} style={{ opacity }}>
        <div ref={dropRef} style={{ padding }}>
          <span className={`${styles.item} ml-2 mr-6 mt-2 mb-2`}>
            <DragIcon type='primary' />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              handleClose={() => deleteIngredient(index)}
            />
          </span>
        </div>
      </div>
    )
  }

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredients) {
      dispatch({ type: ADD_CART_INGREDIENT, ingredients: ingredients })
    }
  });

  const [, bunDropTop] = useDrop({
    accept: 'bun',
    drop(ingredients) {
      dispatch({ type: ADD_CART_INGREDIENT_BUN, ingredients })
    }
  });

  const [, bunDropBottom] = useDrop({
    accept: 'bun',
    drop(ingredients) {
      dispatch({ type: ADD_CART_INGREDIENT_BUN, ingredients })
    }
  });

  return (
    <section>
      <div className={`${styles.constructor} mb-4`} >
        {bun ?
          (
            <div ref={bunDropTop} className='ml-8 mr-8' >
              <ConstructorElement type='top'
                isLocked={true}
                text={`${bun.name} (верх)`}
                thumbnail={bun.image}
                price={bun.price}
              />
            </div>
          ) : (
            <div ref={bunDropTop} className='ml-8 mr-8'>
              <ConstructorElement type='top'
                isLocked={true}
              />
            </div>
          )
        }

        <div className={styles.middle} ref={dropTarget} >
          {data.map((ingredient, index) => {
            return (
              <div className={styles.middleIngredients} key={`${ingredient._id}${index}`} >
                <ConstructorElementMiddle item={ingredient} index={index} />
              </div>
            )
          })
          }
        </div>

        {bun ?
          (
            <div ref={bunDropBottom} className='ml-8 mr-8'>
              <ConstructorElement type='bottom'
                isLocked={true}
                text={`${bun.name} (низ)`}
                thumbnail={bun.image}
                price={bun.price}
              />
            </div>
          ) : (
            <div ref={bunDropBottom} className='ml-8 mr-8'>
              <ConstructorElement type='bottom'
                isLocked={true}
              />
            </div>
          )
        }
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

BurgerConstructor.propTypes = {
  openOrderDetails: PropTypes.func.isRequired
}