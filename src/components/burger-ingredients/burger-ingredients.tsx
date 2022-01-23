import styles from './burger-ingredients.module.scss';
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from '../../types/hooks';
import { useHistory, useLocation } from 'react-router-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Card from './card/burger-ingredients-card';
import Loader from '../loader/loader';
import { SET_ACTIVE_INGREDIENT } from '../../services/actions/ingredient-details';
import { SET_VISIBLE_INGREDIENT_DETAILS } from '../../services/actions/modals';

export default function BurgerIngredients(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { ingredientsData, isLoading } = useSelector(store => store.ingredients);

  const refBun = useRef<HTMLParagraphElement>(null);
  const refSauce = useRef<HTMLParagraphElement>(null);
  const refMain = useRef<HTMLParagraphElement>(null);

  const [current, setCurrent] = useState<string>('bun');
  const handleScroll = (e: string) => {
    setCurrent(e);
    if (e === 'bun') refBun.current?.scrollIntoView({ behavior: 'smooth' });
    if (e === 'sauce') refSauce.current?.scrollIntoView({ behavior: 'smooth' });
    if (e === 'main') refMain.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleActiveTab = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;

    const bunTop = refBun.current?.getBoundingClientRect().top as number;
    const sauceTop = refSauce.current?.getBoundingClientRect().top as number;
    const mainTop = refMain.current?.getBoundingClientRect().top as number;

    if (scrollTop < bunTop) setCurrent('bun');
    if (scrollTop > bunTop && scrollTop < sauceTop) setCurrent('sauce');
    if (scrollTop > mainTop) setCurrent('main');
  };

  const ingredientsList = (type: 'bun' | 'sauce' | 'main') => {
    return ingredientsData
      .filter(ingredient => ingredient.type === type)
      .map((ingredient, index) => {
        const openDetails = () => {
          dispatch({ type: SET_ACTIVE_INGREDIENT, activeIngredient: ingredient });
          dispatch({ type: SET_VISIBLE_INGREDIENT_DETAILS, value: true });
          history.push({ pathname: `/ingredients/${ingredient._id}`, state: { background: location } });
        };
        return <Card item={ingredient} openDetails={openDetails} key={index} cyData={index} />;
      });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <section className={`${styles.main} mr-10 ml-10`}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>

      <div className={`${styles.ingredientsTypeBar} mb-10`}>
        <Tab value="bun" active={current === 'bun'} onClick={handleScroll}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={handleScroll}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={handleScroll}>
          Начинки
        </Tab>
      </div>

      <div className={styles.ingredientsTabs} onScroll={handleActiveTab}>
        <p className="text text_type_main-medium mb-5" ref={refBun}>
          Булки
        </p>
        <div className={styles.ingredientsTabsElement}> {ingredientsList('bun')} </div>

        <p className="text text_type_main-medium mb-5 mt-10" ref={refSauce}>
          Соусы
        </p>
        <div className={styles.ingredientsTabsElement}> {ingredientsList('sauce')} </div>

        <p className="text text_type_main-medium mb-5 mt-10" ref={refMain}>
          Начинка
        </p>
        <div className={styles.ingredientsTabsElement}> {ingredientsList('main')} </div>
      </div>
    </section>
  );
}
