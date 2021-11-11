import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function IngredientDetails() {
    const ingredients = useSelector(state => state.ingredients.ingredientsData);

    let ingredient = useSelector(state => state.ingredientDetails.activeIngredient);
    console.log(ingredient);

    // СЦЕНАРИЙ: переход по прямой ссылке
    const location = useLocation();
    const ingredientID = location.pathname.split('/')[2];
    if (ingredientID && Object.keys(ingredient).length === 0) {
        ingredient = ingredients.find(ing => ing._id === ingredientID);
    }

    return (
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
    )
};