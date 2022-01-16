import React, { useState } from 'react';
import PropTypes from 'prop-types'
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsGallery from './burger-ingredients-gallery/burger-ingredients-gallery';

export default function BurgerIngredients({ ingredients }) {

    const [current, setCurrent] = useState('bun')
    return (
        <section className={styles.main}>

            <div className={`${styles.ingredientsTypeBar} mb-10`} >
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
            </div>

            <section className={styles.galleries} >
                <BurgerIngredientsGallery id='bun' title='Булки' ingredients={ingredients.filter(el => el.type === 'bun')} />
                <BurgerIngredientsGallery id='sauce' title='Соусы' ingredients={ingredients.filter(el => el.type === 'sauce')} />
                <BurgerIngredientsGallery id='main' title='Начинки' ingredients={ingredients.filter(el => el.type === 'main')} />
            </section>
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.array.isRequired
}
