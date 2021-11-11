import styles from './routes.module.css';

import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Route, Switch, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Login from '../../pages/login/login';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import Profile from '../../pages/profile/profile';
import Register from '../../pages/register/register';
import ResetPassword from '../../pages/reset-password/reset-password';
import { ProtectedRoute } from '../protected-route';

import { VISIBLE_ORDER_DETAILS, VISIBLE_INGREDIENT_DETAILS } from '../../services/actions/modals';

export default function Routes() {
    let dispatch = useDispatch();
    let location = useLocation();

    const { visibleOrderDetails, visibleIngredientDetails } = useSelector(state => state.modals);

    const isPasswordForgotten = useSelector(state => state.forgotPassword.isPasswordForgotten);
    console.log('isPasswordForgotten boolean is: ' + isPasswordForgotten);

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

    let background = location.state && location.state.background;

    return (
        <>
            <Switch location={background || location}>
                <Route path='/register'>
                    <Register />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>

                <Route path='/forgot-password'>
                    <ForgotPassword />
                </Route>

                {isPasswordForgotten &&
                    <Route path='/reset-password'>
                        <ResetPassword />
                    </Route>
                }

                <ProtectedRoute path='/profile'>
                    <Profile />
                </ProtectedRoute>

                <ProtectedRoute path='/ingredients/:id'>
                    <IngredientDetails />
                </ProtectedRoute>


                <ProtectedRoute path='/'>
                    <main className={styles.main}>
                        <DndProvider backend={HTML5Backend}>
                            <section className={`${styles.left} mr-10 ml-10`}>
                                <BurgerIngredients
                                    openIngredientDetails={openModalIngredientDetails}
                                />
                            </section>
                            <section className={`${styles.right} mt-25 mr-10`}>
                                <BurgerConstructor
                                    openIngredientDetails={openModalIngredientDetails}
                                    openOrderDetails={openModalOrderDetails}
                                />
                            </section>
                        </DndProvider>
                    </main>

                    {visibleOrderDetails &&
                        <Modal onClose={closeModal}>
                            <OrderDetails />
                        </Modal>
                    }

                </ProtectedRoute>
                <Route>404</Route>
            </Switch>


            {
                background && visibleIngredientDetails &&
                <ProtectedRoute path='/ingredients/:id'>
                    <Modal onClose={closeModal}>
                        <IngredientDetails />
                    </Modal>
                </ProtectedRoute>
            }

        </>
    )
}