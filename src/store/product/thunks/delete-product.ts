import {AppDispatch} from "../../store";

export const deleteProduct = (id: String) => async (dispatch: AppDispatch) => {
    await fetch(`http://localhost:4000/shoe/${id}`, {method: 'DELETE'})
        .then(() => console.log('Delete product successful'));
}