import {IProduct} from "../../../../../store/product/types";

export interface ISelectProduct{
    product: IProduct | undefined,
    addProductFromList: (id: string) => void,
    setIsSelectProduct: (isSelectProduct: boolean) => void,
}