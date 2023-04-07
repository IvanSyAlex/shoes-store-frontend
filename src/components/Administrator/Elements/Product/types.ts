import {IProduct} from "../../../../store/product/types";


export interface IElementProduct{
    product: IProduct,
    actionAdmin: Boolean,
    setActionAdmin: (action: boolean) => void
}