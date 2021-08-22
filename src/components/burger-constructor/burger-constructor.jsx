import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AppStateContext from '../../services/app-context';
import OrderDetails from '../order-details/order-details';
import {API_ORDER_URL} from "../../utils/constants";
import OrderContext from "../../services/order-context";

// [X] Вы можете использовать те данные, которые уже получаете из API для компонента BurgerIngredients. 
// [X] Сохраняйте данные в Context и подпишите на него компонент BurgerConstructor. 
// [X] Данные из контекста должны быть доступны при нажатии на кнопку «Оформить заказ» и в блоке с итоговой стоимостью.

// [X] В отрендеренных данных может быть только один ингредиент с типом bun. 
//      Это булки, возможность перетаскивать которые в дальнейшем будет заблокирована.
// [X] Рендерить данные с типом bun потребуется дважды. Ведь булка должна быть сверху и снизу бургера. 
// [X] Добавляйте к названию булки соответствующее упоминание: «верх» и «низ».
// Учитывайте, что для расчётов итоговой стоимости потребуется цена каждой из этих булок. 
// Подумайте, где в дальнейшем расположите вычисления итоговой стоимости.

// Эндпоинт
// POST https://norma.nomoreparties.space/api/orders

// Тело запроса
//{ 
//    "ingredients": ["609646e4dc916e00276b286e","609646e4dc916e00276b2870"]
//} 

// В теле запроса нужно передать _id всех ингредиентов, которые находятся в компоненте BurgerConstructor. Пример ответа:
// {
//   "name": "Краторный метеоритный бургер",
//  "order": {
//      "number": 6257
//  },
//  "success": true
//} 
// По возможности старайтесь обрабатывать ошибки при работе с API.
// Если запрос прошёл успешно, сохраняйте номер заказа и отображайте его в OrderDetails.

export default function BurgerConstructor() {

    const {ingredients } = useContext(AppStateContext);

    const ingredientsIDs = ingredients.map(ing => ing._id);
    const [orderState, setOrderState] = useState({orderNumber: null, orderLoading: false});
    useEffect(() => {
        const getOrderNumber = async (ingredientsIDs) => {
            setOrderState({ ...orderState, orderLoading: true })
            const reqOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'ingredients': ingredientsIDs
                })
            };
            fetch(API_ORDER_URL, reqOptions)
                .then(res => {
                    console.log(res)
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Error ${res.status}`);
                })
                .then(data => {
                    setOrderState({ orderNumber: data.order.number, orderLoading: false });
                })
                .catch(() => console.log('error'));
        }
        getOrderNumber(ingredientsIDs);
    }, [ingredients])

    const [bun, setBun] = useState({})
    useEffect(() => {
        const getBun = async () => {
            await setBun(ingredients.find(ing => ing.type === 'bun'));
        }
        getBun();
    }, [])

    const [modalOrder, setModalVisible] = useState(false);
    const handleModalOpen = () => { 

        setModalVisible(true); 
    };
    const handleModalClose = () => { setModalVisible(false); };

    const [orderCost, setOrderCost] = useState(null);
    useEffect(() => {
        const getOrderCost = async () => {
            const orderCost = ingredients.reduce((acc, ing) => acc + ing.price, 0)
            setOrderCost(orderCost);
        }
        getOrderCost();
    }, [])

    return (
        <>
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
                <Button type="primary" 
                        size="medium" 
                        onClick={handleModalOpen}>
                    Оформить заказ
                </Button>
            </div>
            {modalOrder && (
                <OrderDetails onClose={handleModalClose} orderNum={orderState.orderNumber} />
            )}
        </>
    )
}

BurgerConstructor.propTypes = {
}