import {AppDispatch} from "../../store";
import orderSlice from "../index";


export const loadOrders = () => async (dispatch: AppDispatch) => {
    dispatch(orderSlice.actions.requestOrders());
    await fetch("http://localhost:4000/order/")
        .then((response) => response.json())
        .then((data) => dispatch(orderSlice.actions.requestOrdersSuccess(data)))
        .catch((error) => dispatch(orderSlice.actions.requestOrdersError(error)))
}