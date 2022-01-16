import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetails from '../order-details/order-details';

export default function BurgerConstructor({ ingredients }) {

    const [bun, setBun] = useState({})
    useEffect(() => {
        const getBun = async () => {
            await setBun(ingredients.find(ing => ing.type === 'bun'));
        }
        getBun();
    })

    const [modalOrder, setModalVisible] = useState(false);
    const handleModalOpen = () => { setModalVisible(true); };
    const handleModalClose = () => { setModalVisible(false); };

    const [orderCost, setOrderCost] = useState('');
    useEffect(() => {
        const getOrderCost = async () => {
            // TODO: вычесть стоимость верхней булки
            const orderCost = ingredients.reduce((acc, ing) => acc + ing.price, 0)
            setOrderCost(orderCost);
        }
        getOrderCost();
    }, [])

    return (
        <>
            {/* по нажатию на карточку слева добавляется сюда
            Добавить параметр id */}
            <div className={`${styles.constructor} mb-4`} >
                <span className="ml-8">
                    <ConstructorElement type='top' isLocked={true} text={`${bun.name} (верх)`} thumbnail={bun.image} price={bun.price} />
                </span>

                <span className={styles.middle}>
                {ingredients.filter(ingredient => ingredient.type !== 'bun')
                    .map(ingredient => {
                        const ing = ingredient;
                        return (
                            <span key={ingredient._id} className={`${styles.middleIngredients} mb-2 mt-2`}>
                                <span className={styles.dragIcon}>
                                    <DragIcon type="primary" />
                                </span>
                                <ConstructorElement
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image_mobile}
                                />
                            </span>
                        )
                    })
                } 
                </span>
                
                <span className="ml-8">
                    <ConstructorElement type='bottom' isLocked={true} text={`${bun.name} (низ)`} thumbnail={bun.image} price={bun.price} />
                </span>


            </div>
            <div className={styles.orderSection}>
                <span className={`${styles.price} m-5`}>
                    {/* CALCULATE PRICE HERE */}
                    <p className="text text_type_digits-medium mr-2">{orderCost}</p>
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="medium" onClick={handleModalOpen}>
                    Оформить заказ
                </Button>
            </div>
            {modalOrder && (
                <OrderDetails onClose={handleModalClose} orderNum='034536' />
            )}
        </>
    )
}

BurgerConstructor.propTypes = {

    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
}