import { BurgerIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { ConnectDropTarget } from 'react-dnd';
import { TIngredient } from '../../../types/types';

interface IBurgerConstructorBunProps {
    bun: TIngredient;
    type: 'top' | 'bottom';
    bunDropRef: ConnectDropTarget;
}

export function BurgerConstructorBun({ bun, type, bunDropRef }: IBurgerConstructorBunProps): JSX.Element {

    const plug: any = () => {return};

    if (!bun) {
        return (
            <div ref={bunDropRef} className='ml-8 mr-8'>
                <ConstructorElement
                    type={type}
                    isLocked={true}
                    text=''
                    thumbnail={plug}
                    price={0}
                />
            </div>
        )
    }

    return (
        <div ref={bunDropRef} className='ml-8 mr-8' >
            <ConstructorElement
                type={type}
                isLocked={true}
                text={`${bun.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
                thumbnail={bun.image}
                price={bun.price}
            />
        </div>
    )
}