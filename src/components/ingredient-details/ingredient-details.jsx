import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function IngredientDetails() {
    const location = useLocation();
    const [ingredient, setIngredient] = useState({});
    const ingredientID = location.pathname.split('/')[2];

    const { ingredientsData, isLoading } = useSelector(store => store.ingredients);
    const activeIngredient = useSelector(store => store.ingredientDetails.activeIngredient);

    useEffect(() => {
        if (Object.keys(activeIngredient).length === 0 && ingredientsData.length !== 0) {
            return setIngredient(ingredientsData.find(ing => ing._id === ingredientID));
        }
        setIngredient(activeIngredient);
    }, [ingredientsData])

    return (
        isLoading  
        ? (<p>Waiting for downloading data..</p>)
        :(
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
    )
};