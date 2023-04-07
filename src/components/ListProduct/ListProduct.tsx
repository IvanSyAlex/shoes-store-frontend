import {useDispatch, useSelector} from "react-redux";
import {loadProducts} from "../../store/product/thunks/load-products";
import React, {useEffect} from "react";
import {AppDispatch, RootState} from "../../store/store";
import {selectProductByIdBrand, selectProducts} from "../../store/product/selectors";
import Product from "../Product/Product";
import styles from "./styles.module.css"
import { Link } from "react-router-dom";


const ListProduct: React.FC<{ id: string | undefined }> = ({id}): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(loadProducts())
    }, []);

    const productsAll = useSelector(selectProducts);
    const productsById =  useSelector((state: RootState) => selectProductByIdBrand(state, id));
    const products = id ? productsById : productsAll;

    return (
        <div className={styles.listProduct}>
            <div className={styles.listProduct__line}/>
            <div className={styles.listProduct__block}>
                {products.map((product) =>
                    <Product
                        key={product._id}
                        {...product}/>
                )}
            </div>

            {id ? <Link to="/" className={styles.listProduct__button}>На Главную </Link>: null}
        </div>
    );
}


export default ListProduct;