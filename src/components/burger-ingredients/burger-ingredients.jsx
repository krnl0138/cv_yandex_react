import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types'
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import Card from './card/burger-ingerdients-card';
import { SET_ACTIVE_INGREDIENT } from '../../services/actions/ingredient-details';

export default function BurgerIngredients({ openIngredientDetails }) {
    const dispatch = useDispatch();

    const { ingredientsData } = useSelector(state => state.ingredients);

    const refBun = useRef(null);
    const refSauce = useRef(null);
    const refMain = useRef(null);

    const [current, setCurrent] = useState('bun')
    const handleScroll = (e) => {
        setCurrent(e);
        if (e === "bun") refBun.current.scrollIntoView({ behavior: 'smooth' });
        if (e === "sauce") refSauce.current.scrollIntoView({ behavior: 'smooth' });
        if (e === "main") refMain.current.scrollIntoView({ behavior: 'smooth' });
    }

    const handleActiveTab = (e) => {
        const scrollTop = e.target.scrollTop;

        const bunTop = refBun.current.getBoundingClientRect().top;
        const sauceTop = refSauce.current.getBoundingClientRect().top;
        const mainTop = refMain.current.getBoundingClientRect().top;

        if (scrollTop < bunTop) setCurrent('bun');
        if (scrollTop > bunTop && scrollTop < sauceTop) setCurrent('sauce');
        if (scrollTop > mainTop) setCurrent('main');
    }

    const ingredientsList = (type) => {
        return ingredientsData
            .filter(ingredient => ingredient.type === type)
            .map((ingredient, index) => {
                const openDetails = () => {
                    dispatch({ type: SET_ACTIVE_INGREDIENT, activeIngredient: ingredient })
                    openIngredientDetails();
                }

                return (<Card item={ingredient} openDetails={openDetails} key={index} />)
            });
    };

    return (
        <section className={styles.main}>

            <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>

            <div className={`${styles.ingredientsTypeBar} mb-10`} >
                <Tab value="bun" active={current === 'bun'} onClick={handleScroll}>Булки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={handleScroll}>Соусы</Tab>
                <Tab value="main" active={current === 'main'} onClick={handleScroll}>Начинки</Tab>
            </div>

            <div className={styles.ingredients} onScroll={handleActiveTab} >
                <p className='text text_type_main-medium' ref={refBun} >Булки</p>
                <div className={styles.ingredientsTab} > {ingredientsList('bun')} </div>

                <p className='text text_type_main-medium' ref={refSauce} >Соусы</p>
                <div className={styles.ingredientsTab} > {ingredientsList('sauce')} </div>

                <p className='text text_type_main-medium' ref={refMain} >Начинка</p>
                <div className={styles.ingredientsTab} > {ingredientsList('main')} </div>
            </div>

        </section>
    )
}

BurgerIngredients.propTypes = {
    openIngredientDetails: PropTypes.func.isRequired
}
