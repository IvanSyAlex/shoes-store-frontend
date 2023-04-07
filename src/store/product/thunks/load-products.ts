import {AppDispatch} from "../../store";
import productSlice from "../index";


export const loadProducts = () => (dispatch: AppDispatch) => {
    dispatch(productSlice.actions.requestProducts());
    fetch("http://localhost:4000/shoes/")
        .then((response) => response.json())
        .then((data)=> dispatch(productSlice.actions.requestProductsSuccess(data)))
        .catch((error) => dispatch(productSlice.actions.requestProductsError(error)))
}