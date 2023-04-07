export const deleteBrand = (id: String) => async () => {
    await fetch(`http://localhost:4000/brand/${id}`, {method: 'DELETE'})
        .then(() => console.log('Delete successful'));
}