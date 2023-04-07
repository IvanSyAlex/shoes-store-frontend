import {IProduct, IProductState} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: IProductState  = {
    productList: [],
    isLoading: false,
    error: ""
}

const productSlice = createSlice({
    name: "Product",
    initialState: initialState,
    reducers: {
        requestProducts: (state): void =>{
            state.isLoading = true;
        } ,
        requestProductsSuccess: (state, {payload}: PayloadAction<any>): void => {
            state.productList = (payload || []).reduce((acc: IProduct[], product: IProduct) => {
                acc.push(product);
                return acc;
            },[]);
            state.isLoading = false;
        },
        requestProductsError: (state, {payload}: PayloadAction<any>): void => {
            state.isLoading = false;
            state.error = payload;
        },
        requestProductPost: (state, {payload}) => {
            state.productList.push(payload);
        },
    }
});


export default productSlice;