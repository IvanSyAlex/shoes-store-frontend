import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../product/types";
import {IBasketState} from "./types";

const initialState: IBasketState = {
    listBasket: [],
}

const basketSlice = createSlice({
    name: "Basket",
    initialState: initialState,
    reducers: {
        addProductInBasket: (state, {payload}: PayloadAction<IProduct | undefined>) => {
            let reload = true;
            state.listBasket.map((element) => {
                if (element.product._id === payload?._id) {
                    element.count += 1;
                    reload = false;
                }
            });

            if (reload && payload)
                state.listBasket.push({product: payload ,count: 1})
            reload = true;
        },
        removeProductFromBasket: (state, {payload}: PayloadAction<IProduct | undefined>) => {
            state.listBasket.map((element) => {
                if (element.product._id === payload?._id && element.count) {
                    element.count -= 1;
                }
                state.listBasket = state.listBasket.filter((element) => element.count !== 0 );
            });

        },
    }
});


export default basketSlice