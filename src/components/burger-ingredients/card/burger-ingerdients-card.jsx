import PropTypes from "prop-types";
import styles from './burger-ingredients-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";

export default function Card({ item, openDetails }) {

  const cartIngredients = useSelector(state => state.cart.сartIngredients);
  const buns = useSelector(state => state.cart.bunIngredients);

  const counter = [...cartIngredients, ...buns].filter(el => el._id === item._id).length;

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: item,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const [, bunRef] = useDrag({
    type: 'bun',
    item: item
  });

  return (
    <div ref={item.type === 'bun' ? bunRef : ref}
      className={`${styles.card} pl-2 pr-2`}
      onClick={openDetails}
      key={item._id}
      style={{ opacity }}>

      {
        counter > 0 
          ? (< Counter count={item.type === 'bun' ? counter + 1 : counter} size="default" />)
          : ('')
      }

      <img className="p-2 pb-4" src={item.image} alt={item.name} />
      <span className={styles.price}>
        <p className="text text_type_digits-default mr-2">{item.price}</p>
        <CurrencyIcon type="primary" />
      </span>
      <p className="text text_type_main-default pb-5 pt-5" style={{ fontWeight: 700 }}>{item.name}</p>
    </div>
  )
}

Card.propTypes = {
  openDetails: PropTypes.func.isRequired,
  item: PropTypes.shape({
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
  })
}