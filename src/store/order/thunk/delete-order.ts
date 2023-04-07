import {AppDispatch} from "../../store";

export const deleteOrder = (id: string) => async (dispatch: AppDispatch) => {
    await fetch(`http://localhost:4000/order/${id}`, {method: 'DELETE'})
        .then(() => console.log('Delete product successful'));
}