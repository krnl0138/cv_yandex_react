import styles from './routes.module.css';

import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react';
import { getIngredients } from '../../services/actions/ingredients';

import PageNotFound from '../../pages/page-not-found/page-not-found';
import Login from '../../pages/login/login';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import Profile from '../../pages/profile/profile';
import Register from '../../pages/register/register';
import ResetPassword from '../../pages/reset-password/reset-password';
import ProfileOrders from '../../pages/profile-orders/profile-orders';
import Feed from '../../pages/feed/feed';
import OrderView from '../order-view/order-view';

import { ProtectedRoute } from '../protected-route';

import { getUserData } from '../../services/actions/auth';

export default function Routes() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const { visibleOrderDetails, visibleIngredientDetails, visibleOrdersDetails } = useSelector(store => store.modals);

    const background = location.state?.background;
    console.log(location);

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(getUserData());
    }, [dispatch])

    const closeModal = () => {
        dispatch({ type: 'VISIBLE_ORDER_DETAILS', value: false })
        dispatch({ type: 'VISIBLE_INGREDIENT_DETAILS', value: false })
        if (background) {
            history.replace({ pathname: background.pathname, state: null });
        }
    }

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

                <Route path='/reset-password'>
                    <ResetPassword />
                </Route>

                <Route exact={true} path='/ingredients/:id'>
                    <IngredientDetails />
                </Route>

                <Route exact={true} path='/feed'>
                    <Feed />
                </Route>

                <Route path='/feed/:id'>
                    <OrderView />
                </Route>

                <ProtectedRoute exact={true} path='/profile'>
                    <Profile />
                </ProtectedRoute>

                <ProtectedRoute exact={true} path='/profile/orders'>
                    <ProfileOrders />
                </ProtectedRoute>

                <ProtectedRoute path='/profile/orders/:id'>
                    <OrderView />
                </ProtectedRoute>

                <Route exact={true} path='/'>
                    <main className={styles.main}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients />
                            <BurgerConstructor />
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

            {
                background && visibleOrdersDetails &&
                <Route exact={true} path={`${background.pathname}/:id`}>
                    <Modal onClose={closeModal}>
                        <OrderView modal={true} order={location.state.order} />
                    </Modal>
                </Route>
            }

        </>
    )
}