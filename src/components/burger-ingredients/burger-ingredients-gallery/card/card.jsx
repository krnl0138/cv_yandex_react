import React, {useState} from "react";
import PropTypes from "prop-types";
import styles from './card.module.css';
import { Counter, CurrencyIcon, Tab, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientDetails from '../../../ingredient-details/ingredient-details';


export default function Card({ ingredient }) {

    const [modalIngredientVisible, setModalIngredient] = useState(false);
    const handleModalIngredientOpen = () => { setModalIngredient(true) };
    const handleModalIngredientClose = () => { setModalIngredient(false) };

    return (
        <>
            <div className={`${styles.card} pl-4 pr-4`} onClick={handleModalIngredientOpen} key={ingredient._id}>
                {/* counter on click */}
                < Counter count={1} size="default" />
                <img className="p-2 pb-4" src={ingredient.image} alt={ingredient.name} />
                <div className={styles.price}>
                    <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default pb-5 pt-5" style={{ fontWeight: 700 }}>{ingredient.name}</p>
            </div>

            {modalIngredientVisible && (
                <IngredientDetails onClose={handleModalIngredientClose} ingredient={ingredient} />
            )}
        </>
    )
}

Card.propTypes = {
    ingredient: PropTypes.shape({
        _id: String,
        name: String,
        type: String,
        proteins: Number,
        fat: Number,
        carbohydrates: Number,
        calories: Number,
        price: Number,
        image: String,
        image_mobile: String,
        image_large: String,
        __v:Number,
       }).isRequired
}