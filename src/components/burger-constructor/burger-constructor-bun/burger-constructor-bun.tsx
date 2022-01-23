import styles from './burger-constructor-bun.module.scss';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { ConnectDropTarget } from 'react-dnd';
import { TIngredient } from '../../../types/types';

interface IBurgerConstructorBunProps {
  bun: TIngredient;
  type: 'top' | 'bottom';
  bunDropRef: ConnectDropTarget;
}

export function BurgerConstructorBun({ bun, type, bunDropRef }: IBurgerConstructorBunProps): JSX.Element {
  if (!bun) {
    return (
      <div ref={bunDropRef} className="ml-8 mr-8" data-cy={type === 'top' ? 'burger-constructor-bun-top' : ''}>
        <ConstructorElement
          type={type}
          isLocked={true}
          text=""
          thumbnail="https://cdn-icons-png.flaticon.com/128/1/1601.png" // ? cannot be removed due to TS type
          price={0}
        />
      </div>
    );
  }

  return (
    <div ref={bunDropRef} className={styles.bun}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={`${bun.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
        thumbnail={bun.image}
        price={bun.price}
      />
    </div>
  );
}
