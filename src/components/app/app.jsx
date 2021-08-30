import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { getIngredients } from '../../services/actions/ingredients';
import { VISIBLE_ORDER_DETAILS, VISIBLE_INGREDIENT_DETAILS } from '../../services/actions/modals';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


export default function App() {
    const dispatch = useDispatch();
 
    useEffect(() => {
        dispatch(getIngredients());
      }, [dispatch])

    const { visibleOrderDetails, visibleIngredientDetails } = useSelector(state => state.modals);

    const openModalOrderDetails = () => {
        dispatch({ type: VISIBLE_ORDER_DETAILS, value: true })
    }

    const openModalIngredientDetails = () => {
        dispatch({ type: VISIBLE_INGREDIENT_DETAILS, value: true })
    }

    const closeModal = () => {
        dispatch({ type: VISIBLE_ORDER_DETAILS, value: false })
        dispatch({ type: VISIBLE_INGREDIENT_DETAILS, value: false })
    }

    return (
        <>
            < AppHeader />
            <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                <div className={`${styles.left} mr-10 ml-10`}>
                    <BurgerIngredients
                    openIngredientDetails={openModalIngredientDetails}
                    />
                </div>
                <div className={`${styles.right} mt-25 mr-10`}>
                    <BurgerConstructor 
                    openIngredientDetails={openModalIngredientDetails}
                    openOrderDetails={openModalOrderDetails}
                    />
                </div>
                </DndProvider>
            </main>
            {visibleOrderDetails &&
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            }
            {visibleIngredientDetails &&
                <Modal onClose={closeModal}>
                    <IngredientDetails />
                </Modal>
            }
        </>
    )
}