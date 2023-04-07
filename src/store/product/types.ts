import {IBrand} from "../brands/types";

export interface IProduct {
    _id: string,
    name: string,
    brand: IBrand,
    imageUrl: string,
    description: string,
    price: number
}

export interface IProductState {
    productList: IProduct[],
    isLoading: boolean,
    error: string;
}