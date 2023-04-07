import {IOrder} from "../types";

export const updateOrder = (obj: IOrder, _id: string) => async () => {
    console.log("obj >>> ", obj);
    await fetch(`http://localhost:4000/order/${_id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            firstName: obj.firstName,
            lastName: obj.lastName,
            address: obj.address,
            email: obj.email,
            phone: obj.phone,
            purchase: obj.purchase
        })
    }).then(() => console.log('Update order successful'));
}