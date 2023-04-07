import {IBrand, IBrandsState} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: IBrandsState = {
    listBrand: [],
    isLoading: false,
    error: "",
};

const brandsSlice = createSlice({
    name: 'Brands',
    initialState: initialState,
    reducers:{
        requestBrands: (state): void => {
            state.isLoading = true;
        },
        requestBrandsSuccess: (state, {payload}: PayloadAction<any>): void => {
            state.listBrand = (payload || []).reduce((acc: IBrand[], brand: IBrand) => {
                acc.push(brand);
                return acc;
            },[]);
            state.isLoading = false;
        },
        requestBrandsError: (state, {payload}: PayloadAction<any>): void => {
            state.isLoading = false;
            state.error = payload;
        },
        requestBrandPost: (state, {payload}) => {
            state.listBrand.push(payload);
        }
    }
});


export default brandsSlice;