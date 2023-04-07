import {IProduct} from "../../../../store/product/types";


export interface IProductUpdate {
    product: IProduct,
    actionAdmin: Boolean,
    setUpdate: (update: boolean) => void,
    setActionAdmin: (action: boolean) => void,
}