import {IProduct} from "../types";

export const updateProduct = (obj: IProduct) => () => {
    fetch(`http://localhost:4000/shoe/${obj._id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            name: obj.name,
            brand: obj.brand._id,
            imageUrl: obj.imageUrl,
            description: obj.description,
            price: obj.price
        })
    }).then(() => console.log('Update product successful'));
}