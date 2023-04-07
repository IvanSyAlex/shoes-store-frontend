
export interface  IPurchase{
    product: string,
    count: number,
}
export interface IOrder{
    _id: string;
    firstName: string,
    lastName: string,
    address: string,
    email: string,
    phone: string,
    date: string,
    purchase: IPurchase[]
}
export interface IOrderSate{
    orderList: IOrder[],
    isLoading: boolean,
    error: string;
}
