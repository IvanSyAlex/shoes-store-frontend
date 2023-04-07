import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOrder, IOrderSate} from "./types";


const initialState: IOrderSate = {
    orderList: [],
    isLoading: false,
    error:""
};

const orderSlice = createSlice({
    name:"Order",
    initialState: initialState,
    reducers:{
        requestOrders: (state): void =>{
            state.isLoading = true;
        } ,
        requestOrdersSuccess: (state, {payload}: PayloadAction<any>): void => {
            state.orderList = (payload || []).reduce((acc: IOrder[], order: IOrder) => {
                acc.push(order);
                return acc;
            },[]);
            state.isLoading = false;
        },
        requestOrdersError: (state, {payload}: PayloadAction<any>): void => {
            state.isLoading = false;
            state.error = payload;
        },
        requestOrderPost: (state, {payload}) => {
            state.orderList.push(payload);
        },
    }
});


export default orderSlice;