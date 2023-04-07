import {IOrder} from "../../../../store/order/types";

export interface IElementOrder{
    order: IOrder,
    actionAdmin: Boolean,
    setActionAdmin: (action: boolean) => void,
}