export interface IBrand {
    _id: string,
    nameBrand: string,
    imageUrl: string,
}

export interface IBrandsState {
    listBrand: IBrand[],
    isLoading: boolean,
    error: string;
}