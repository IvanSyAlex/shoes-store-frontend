import React from "react";
import {useDispatch, useSelector} from "react-redux";
import ElementBrandAdmin from "../../Elements/Brand/ElementBrandAdmin";
import {AppDispatch} from "../../../../store/store";
import {selectBrands} from "../../../../store/brands/selectors";
import {IListBrand} from "./types";
import styles from "./styles.module.css"


const ListBrandAdmin: React.FC<IListBrand> = (props) => {
    const dispatch = useDispatch<AppDispatch>()
    const brands = useSelector(selectBrands);

    return (
        <div className={styles.listBrandAdmin}>
            {brands.map((brand) => {
                return <ElementBrandAdmin
                    key={brand._id}
                    brand={brand}
                    actionAdmin={props.actionAdmin}
                    setActionAdmin={props.setActionAdmin}
                />
            })}
        </div>
    );
}

export default ListBrandAdmin;