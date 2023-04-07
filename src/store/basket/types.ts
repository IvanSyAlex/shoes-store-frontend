import {IProduct} from "../product/types";


export interface IBasket {
    product: IProduct,
    count: number,
}

export interface IBasketState {
    listBasket: IBasket[],
}