import {RootState} from "../store";


export const selectBasket = (state: RootState) => state.basket.listBasket;

export const selectBasketAmountProduct = (state: RootState) => {
    let amount = 0;
    state.basket.listBasket.map((product) => amount += product.count);
    return amount;
}