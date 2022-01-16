import { TBun, TIngredient, TOrder } from "../types/types"

export const ingredientTestExample: TIngredient = {
    "_id": "60666c42cc7b410027a1a9b1",
    "name": "Краторная булка N-200i",
    "type": "main",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
}

export const ingredientBunTestExample: TBun = {
    "_id": "60666c42cc7b410027a1a9b1",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
}

export const orderTestExample: TOrder = {
    "_id": "61b82b426d7cd8001b2c9199",
    "ingredients": [
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733cf"
    ],
    "status": "done",
    "name": "Space антарианский бургер",
    "createdAt": "2021-12-14T05:27:30.090Z",
    "updatedAt": "2021-12-14T05:27:30.258Z",
    "number": 6704
}

export const wsMessageTestExample = {
    "success": true,
    "orders": [
        { "_id": "61b82b426d7cd8001b2c9199", "ingredients": ["60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733cf"], "status": "done", "name": "Space антарианский бургер", "createdAt": "2021-12-14T05:27:30.090Z", "updatedAt": "2021-12-14T05:27:30.258Z", "number": 6704 },
        { "_id": "61c11b5e6d7cd8001b2cc7c8", "ingredients": ["60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733ce"], "status": "done", "name": "Традиционный-галактический space антарианский бургер", "createdAt": "2021-12-21T00:10:06.440Z", "updatedAt": "2021-12-21T00:10:06.601Z", "number": 6847 },
        { "_id": "61c2388b6d7cd8001b2ccddc", "ingredients": ["60d3b41abdacab0026a733cd"], "status": "done", "name": "Space бургер", "createdAt": "2021-12-21T20:26:51.534Z", "updatedAt": "2021-12-21T20:26:51.661Z", "number": 6862 }
        ],
        "total": 8135, "totalToday": 41
}       
