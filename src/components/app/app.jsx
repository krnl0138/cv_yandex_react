import React, { useEffect, useState } from 'react';

import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppStateContext from '../../services/app-context';

import dataOffline from '../../utils/data';

import {API_URL} from '../../utils/constants';


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
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка ${res.status}`);
                })
                .then(data => setState({...state, ingredients: data.data, isLoading:false}))
                .catch(e => setState({...state, hasError: true, isLoading:false}))
        }
        getIngredients();
    }, []);

    return (
        <AppStateContext.Provider value={state}>
            <div>
                < AppHeader />
                {!state.isLoading && !state.hasError && state.ingredients &&
                    <main className={styles.main}>
                        <div className={`${styles.left} mr-10 ml-10`}>
                            <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
                            {/*<BurgerIngredients ingredients={state.ingredients} />*/}
                            <BurgerIngredients />
                        </div>
                        <div className={`${styles.right} mt-25 mr-10`}>
                            {/*<BurgerConstructor ingredients={state.ingredients} />*/}
                            <BurgerConstructor />
                        </div>
                    </main>
                }
            </div>
        </AppStateContext.Provider >
    )
}
