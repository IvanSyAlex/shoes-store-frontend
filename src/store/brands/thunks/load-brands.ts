import {AppDispatch} from "../../store";
import brandsSlice from "../index";


export const loadBrands = () => (dispatch: AppDispatch) => {
    dispatch(brandsSlice.actions.requestBrands());
    fetch("http://localhost:4000/brands/")
        .then((response) => response.json())
        .then((data) => {dispatch(brandsSlice.actions.requestBrandsSuccess(data))})
        .catch((error) => dispatch(brandsSlice.actions.requestBrandsError(error)));
}