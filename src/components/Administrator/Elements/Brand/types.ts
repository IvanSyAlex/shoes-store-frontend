import {IBrand} from "../../../../store/brands/types";


export interface IElementBrand{
    brand: IBrand,
    actionAdmin: Boolean,
    setActionAdmin: (action: boolean) => void
}