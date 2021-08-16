import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

import Modal from '../modal/modal';

export default function IngredientDetails({ onClose, ingredient }) {

    return (
        <Modal onClose={onClose}>
            <div className={`${styles.card} pt-10 pb-10`}>
                <h3 className={`${styles.header} ml-15 mt-5 text text_type_main-large`}>Детали ингредиента</h3>
                <img className={`${styles.mainImage} mt-10`} src={ingredient.image_large} alt={ingredient.name} />
                <p className={`${styles.name} pt-4 pb-6 text text_type_main-medium`}>
                    {ingredient.name}
                </p>
                <ul className={styles.info}>
                    <li>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Калории, ккал</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</p>
                    </li>
                    <li>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</p>
                    </li>
                    <li>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</p>
                    </li>
                    <li>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</p>
                    </li>

                </ul>
            </div>
        </Modal>
    )
};

IngredientDetails.propTypes = {
    onClose: PropTypes.func.isRequired,

   ingredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
   }).isRequired
}; 