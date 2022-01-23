import styles from './burger-constructor-middle.module.scss';
import React from 'react';
import { TIngredient } from '../../../types/types';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from '../../../types/hooks';
import { DELETE_CART_INGREDIENT, MOVE_CART_INGREDIENT } from '../../../services/actions/cart';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IBurgerConstructorMiddleProps {
  item: TIngredient;
  index: number;
}

export function BurgerConstructorMiddle({ item, index }: IBurgerConstructorMiddleProps): JSX.Element {
  const dispatch = useDispatch();

  const [{ opacity }, dragRef] = useDrag({
    type: 'move',
    item: () => {
      return { item, index };
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [{ paddingLeft }, dropRef] = useDrop({
    accept: 'move',
    drop(ingredient) {
      dispatch({ type: MOVE_CART_INGREDIENT, ingredient, dropIndex: index });
    },
    collect: monitor => ({
      paddingLeft: monitor.isOver() ? 30 : 0,
    }),
  });

  const deleteIngredient = (index: number) => {
    dispatch({ type: DELETE_CART_INGREDIENT, ingredientIndex: index });
  };

  return (
    <div ref={dragRef} style={{ opacity }}>
      <div ref={dropRef} style={{ paddingLeft }}>
        <span className={`${styles.item} ml-2 mr-6 mt-2 mb-2`}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            handleClose={() => deleteIngredient(index)}
          />
        </span>
      </div>
    </div>
  );
}
