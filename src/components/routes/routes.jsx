import styles from './routes.module.css';

import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Route, Switch, useLocation, useHistory, matchPath } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';
import { getIngredients } from '../../services/actions/ingredients';

import PageNotFound from '../../pages/page-not-found/page-not-found';
import Login from '../../pages/login/login';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import Profile from '../../pages/profile/profile';
import Register from '../../pages/register/register';
import ResetPassword from '../../pages/reset-password/reset-password';
import Test from '../test/test';

import { ProtectedRoute } from '../protected-route';

import { VISIBLE_ORDER_DETAILS, VISIBLE_INGREDIENT_DETAILS } from '../../services/actions/modals';

export default function Routes() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    // const [background, setBackground] = useState(location.state?.background);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    const { visibleOrderDetails, visibleIngredientDetails } = useSelector(store => store.modals);

    const isPasswordForgotten = useSelector(store => store.forgotPassword.isPasswordForgotten);

    const openModalOrderDetails = () => {
        dispatch({ type: VISIBLE_ORDER_DETAILS, value: true })
    }

    const openModalIngredientDetails = () => {
        dispatch({ type: VISIBLE_INGREDIENT_DETAILS, value: true })
    }

    const closeModal = () => {
        dispatch({ type: VISIBLE_ORDER_DETAILS, value: false })
        dispatch({ type: VISIBLE_INGREDIENT_DETAILS, value: false })
        history.goBack();
    }

    let background = location.state?.background;

    function deleteBackground() {
        const match = matchPath(location.pathname, {
            path: "/ingredients/:id",
            exact: true,
            strict: true
        });
        if (match?.isExact) history.replace({pathname: location.pathname, state: null}) 
    }
    
    useEffect(() => {
        window.addEventListener("beforeunload", deleteBackground);
        return () => {
            window.removeEventListener("beforeunload", deleteBackground);
        };
    }, []);
    console.log(location)
    
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

                <Route exact={true} path='/ingredients/:id'>
                    <IngredientDetails />
                </Route>

                <ProtectedRoute path='/profile'>
                    <Profile />
                </ProtectedRoute>

                <Route exact={true} path='/'>
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
                </Route>

                <Route>
                    <PageNotFound />
                </Route>
            </Switch>

            {
                background && visibleIngredientDetails &&
                <Route exact={true} path='/ingredients/:id'>
                    <Modal onClose={closeModal}>
                        <IngredientDetails />
                    </Modal>
                </Route>
            }
        </>
    )
}

//export default withRouter(Routes);