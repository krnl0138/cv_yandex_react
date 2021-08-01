import PropTypes, { string } from 'prop-types';

export const ingredientsPropTypes = PropTypes.shape({
    _id:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
    proteins:PropTypes.number,
    fat:PropTypes.number,
    carbohydrates:PropTypes.number,
    calories:PropTypes.number,
    price:PropTypes.number,
    image:PropTypes.string.isRequired,
    image_mobile:PropTypes.string,
    image_large:PropTypes.string,
    __v:0
})

export const ingredientType = {
    _id: string,
    name: string,
    type: string,
    proteins: Number,
    fat: Number,
    carbohydrates: Number,
    calories: Number,
    price: Number,
    image:string,
    image_mobile:string,
    image_large:string,
    __v:Number,
  }