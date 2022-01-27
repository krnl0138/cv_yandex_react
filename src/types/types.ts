interface IIngredientProperties {
  _id: string;
  name: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IBun extends IIngredientProperties {
  type: 'bun';
}
export interface IMain extends IIngredientProperties {
  type: 'main';
}
export interface ISauce extends IIngredientProperties {
  type: 'sauce';
}

export type TIngredient = IMain | IBun | ISauce;

export type TIngredientsIDs = Array<string>;

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  ingredients: Array<string>;
};

export type TFormData = {
  username?: string;
  email?: string;
  password?: string;
  token?: string;
};

export type TRequestOptions = {
  method: string;
  headers: {
    [header: string]: string;
  };
  body?: string;
};
