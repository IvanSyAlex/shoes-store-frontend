import {RootState} from "../store";
import {IProduct} from "./types";


export const selectProducts = (state: RootState) => state.products.productList;

export const selectProductsById = (state: RootState, id: string | null | undefined) => {
    if (!id || !selectProducts(state)?.length) {
        return;
    }
    return selectProducts(state).find((element) => element._id === id)
};

export const selectListProductsByIds = (state: RootState, ids: string[]) => {
    const products = selectProducts(state);
    return ids.map((id) =>
        products.find((product) => product._id === id)
    )
}

export const selectProductByIdBrand = (state: RootState, id: string | undefined) => {
    return selectProducts(state).reduce((acc: IProduct[], product: IProduct) => {
        if (product.brand._id === id) acc.push(product);
        return acc;
    }, []);

}