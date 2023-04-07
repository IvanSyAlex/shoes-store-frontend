import {combineReducers, configureStore} from "@reduxjs/toolkit";
import brandsSlice from "./brands";
import productSlice from "./product";
import basketSlice from "./basket";
import orderSlice from "./order";

const rootReducer = combineReducers({
    brands: brandsSlice.reducer,
    products: productSlice.reducer,
    basket: basketSlice.reducer,
    order: orderSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
