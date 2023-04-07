export const addBrand = (obj: any) => async () => {

    await fetch('http://localhost:4000/brand', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(obj)
    });
}