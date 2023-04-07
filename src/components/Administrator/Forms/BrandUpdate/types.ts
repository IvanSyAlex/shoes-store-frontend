import {IBrand} from "../../../../store/brands/types";


export interface IBrandUpdate {
    brand: IBrand,
    actionAdmin: Boolean,
    setUpdate: (update: boolean) => void,
    setActionAdmin: (action: boolean) => void,
}
