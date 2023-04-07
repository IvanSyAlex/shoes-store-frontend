export const addOrder = (obj: any) => async () => {
    console.log("data >>> ", obj);

    await fetch('http://localhost:4000/order', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(obj)
    });
}