import styles from './ingredient-details.module.scss';
import { useSelector } from '../../types/hooks';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Loader from '../loader/loader';
import { TIngredient } from '../../types/types';

export default function IngredientDetails(): JSX.Element {
  const location = useLocation();
  const [ingredient, setIngredient] = useState<TIngredient>();
  const { ingredientsData, isLoading } = useSelector(store => store.ingredients);
  const activeIngredient = useSelector(store => store.ingredientDetails.activeIngredient);

  useEffect(() => {
    const ingredientID = location.pathname.split('/')[2];

    if (activeIngredient === null) {
      const ingFound = ingredientsData.find(ing => ing._id === ingredientID);
      if (ingFound) {
        return setIngredient(ingFound);
      }
    }
    if (activeIngredient !== null) {
      setIngredient(activeIngredient);
    }
  }, [ingredientsData, activeIngredient, location.pathname]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={`${styles.card}`}>
      <h3 className="mt-5 text text_type_main-large">Детали ингредиента</h3>
      <img className={`${styles.mainImage} mt-10`} src={ingredient?.image_large} alt={ingredient?.name} />
      <p className={`${styles.name} pt-4 pb-6 text text_type_main-medium`}>{ingredient?.name}</p>
      <ul className={styles.info}>
        <li>
          <p className="text text_type_main-default text_color_inactive mb-2">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient?.calories}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient?.proteins}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient?.fat}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient?.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}
