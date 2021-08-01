import React, { useEffect, useState } from 'react';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import DATA_OFFLINE from '../../utils/data';

import { Tab, Typography } from '@ya.praktikum/react-developer-burger-ui-components';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export default function App() {
    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        ingredients: []
    });

    useEffect(() => {
        const getIngredients = async () => {
            setState({...state, isLoading: true});
            fetch(API_URL)
                .then(res => res.json())
                .then(data => setState({...state, ingredients: data.data, isLoading:false}))
                .catch(e => setState({...state, hasError: true, isLoading:false}))
        }
        getIngredients();
    }, []);

    console.log(state.ingredients)

    return (
        <>
            <div>
                < AppHeader />
                {!state.isLoading && !state.hasError && state.ingredients &&
                    <main className={styles.main}>
                        <div className={`${styles.left} mr-10 ml-10`}>
                            <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
                            <BurgerIngredients ingredients={state.ingredients} />
                        </div>
                        <div className={`${styles.right} mt-25 mr-10`}>
                            <BurgerConstructor ingredients={state.ingredients} />
                        </div>
                    </main>
                }
            </div>
        </>

    )
}
