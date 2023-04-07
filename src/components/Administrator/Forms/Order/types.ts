import {IOrder} from "../../../../store/order/types";


export interface IOrderUpdate {
    order: IOrder,
    actionAdmin: Boolean,
    setInfoActive: (active: boolean) => void,
    setActionAdmin: (action: boolean) => void,
}