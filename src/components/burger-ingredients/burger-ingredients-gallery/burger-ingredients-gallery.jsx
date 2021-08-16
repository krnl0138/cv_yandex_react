import PropTypes from 'prop-types';
import styles from './burger-ingredients-gallery.module.css';
import { Counter, Icons, Tab, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import Card from './card/card';

export default function BurgerIngredientsGallery({id, title, ingredients}) {
    return (
        <div id={id}>
            <div>
                <h4 className="text text_type_main-medium">{title}</h4>

            </div>
            <div className={`${styles.gallery} mt-6 ml-4 mb-10`}>
                {ingredients.map(ingredient => <Card key={ingredient._id} ingredient={ingredient} /> )}
            </div>
        </div>
    )
}


BurgerIngredientsGallery.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
}