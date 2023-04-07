import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ElementProductAdmin from "../../Elements/Product/ElementProductAdmin";
import {IListProduct} from "./types";
import {loadProducts} from "../../../../store/product/thunks/load-products";
import {AppDispatch} from "../../../../store/store";
import {selectProducts} from "../../../../store/product/selectors";
import styles from "./styles.module.css"


const ListProductAdmin: React.FC<IListProduct> = ({actionAdmin, setActionAdmin}) => {

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(loadProducts());
    }, []);


    const products = useSelector(selectProducts);

    return (
        <div className={styles.listProductAdmin}>
            {products.map((product) =>
                <ElementProductAdmin
                    key={product._id}
                    product={product}
                    actionAdmin={actionAdmin}
                    setActionAdmin={setActionAdmin}
                />
            )}
        </div>
    );

}

export default ListProductAdmin;