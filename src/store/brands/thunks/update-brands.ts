import {IBrand} from "../types";


export const updateBrand = (obj: IBrand) => () => {
    fetch(`http://localhost:4000/brand/${obj._id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            nameBrand: obj.nameBrand,
            imageUrl: obj.imageUrl
        })
    }).then(() => console.log('Update brand successful'));
}