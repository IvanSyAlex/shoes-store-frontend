
import {IProduct} from "../../../../store/product/types";
import {IPurchase} from "../../../../store/order/types";

export interface IOrderProductAdmin{
    product: (IProduct | undefined)[],
    purchase: IPurchase[],
    deleteProductFromList: (id: string) => void,
    upCountProductFromPurchase: (id: string, amount: number) => void,
}