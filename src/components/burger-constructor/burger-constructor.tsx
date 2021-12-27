import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../types/hooks';
import { useDrop, useDrag } from 'react-dnd';
import { useHistory, useLocation } from 'react-router-dom';
import { postOrder } from '../../services/actions/order-details';
import { RootState } from '../../services/reducers/index';
import { TIngredient, TIngredientsIDs } from '../../types/types';

interface IConstructorElementMiddleProps {
  item: TIngredient; 
  index: number;
}

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((store: RootState) => store.user);
  const cartIngredients = useSelector((store: RootState) => store.cart.сartIngredients);
  const ingredientsIDs: TIngredientsIDs = cartIngredients.map(item => item._id);
  const bun = useSelector((store: RootState) => store.cart.bunIngredients[0]);

  const orderCost = bun
    ? [bun, bun, ...cartIngredients].reduce((acc, ing) => acc += ing.price, 0)
    : cartIngredients.reduce((acc, ing) => acc += ing.price, 0);


  const orderBurger = () => {
    if (!user.username) {
      return history.push({ pathname: '/login' });
    }

    if (bun && cartIngredients.length !== 0) {
      dispatch({ type: 'VISIBLE_ORDER_DETAILS', value: true })
      dispatch(postOrder(ingredientsIDs));
      history.replace({ pathname: '/', state: { from: location.pathname } });
    }
  }

  const deleteIngredient = (index: number) => {
    dispatch({ type: 'DELETE_CART_INGREDIENT', ind: index })
  }

  const ConstructorElementMiddle = ({ item, index }: IConstructorElementMiddleProps) => {
    const [{ opacity }, dragRef] = useDrag({
      type: 'move',
      item: () => {
        return { item, index };
      },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    })

    const [{ paddingLeft }, dropRef] = useDrop({
      accept: 'move',
      drop(ingredient) {
        dispatch({ type: 'MOVE_CART_INGREDIENT', ingredient, dropIndex: index })
      },
      collect: monitor => ({
        paddingLeft: monitor.isOver() ? 30 : 0
      })
    });

    return (
      <div ref={dragRef} style={{ opacity }}>
        <div ref={dropRef} style={{ paddingLeft }}>
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
    drop(ingredient) {
      dispatch({ type: 'ADD_CART_INGREDIENT', ingredient })
    }
  });

  const [, bunDropTop] = useDrop({
    accept: 'bun',
    drop(ingredient) {
      dispatch({ type: 'ADD_CART_INGREDIENT_BUN', ingredient })
    }
  });

  const [, bunDropBottom] = useDrop({
    accept: 'bun',
    drop(ingredient) {
      dispatch({ type: 'ADD_CART_INGREDIENT_BUN', ingredient })
    }
  });

  return (
    <section className={`${styles.main} mt-25 mr-10`}>
      <div className={`${styles.constructor} mb-4`} >
        {bun ?
          (
            <div ref={bunDropTop} className='ml-8 mr-8' >
              <ConstructorElement
                type='top'
                isLocked={true}
                text={`${bun.name} (верх)`}
                thumbnail={bun.image}
                price={bun.price}
              />
            </div>
          ) : (
            <div ref={bunDropTop} className='ml-8 mr-8'>
              <ConstructorElement
                type='top'
                isLocked={true}
                text=''
                thumbnail=''
                price={0}
              />
            </div>
          )
        }

        <div className={styles.middle} ref={dropTarget} >
          {cartIngredients.map((ingredient, index) => {
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
              <ConstructorElement
                type='bottom'
                isLocked={true}
                text=''
                thumbnail=''
                price={0}
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