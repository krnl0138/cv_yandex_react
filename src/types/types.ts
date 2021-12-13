export type TIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
}

export type TIngredientsIDs = Array<string>;

export type TOrder = {
    status: string;
    name: string;
    number: string;
    createdAt: Date;
    ingredients: Array<TIngredient>;
}

export type TFormData = {
    username?: string;
    email?: string;
    password?: string;
    token?: string
}

export type TRequestOptions = {
    method: string;
    headers: {
        [header: string]: string;
    };
    body?: string;
}