import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';
import classnames from "classnames";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store/store";
import {loadBrands} from "../../../store/brands/thunks/load-brands";
import {loadProducts} from "../../../store/product/thunks/load-products";
import FormBrandAdd from "../Forms/BrandAdd/FormBrandAdd";
import ListBrandAdmin from "../Lists/BrandAdmin/ListBrandAdmin";
import FormProductAdd from "../Forms/ProductAdd/FormProductAdd";
import ListProductAdmin from "../Lists/ProductAdmin/ListProductAdmin";
import ListOrderAdmin from "../Lists/OrderAdmin/ListOrderAdmin";
import {loadOrders} from "../../../store/order/thunk/load-orders";


const AdminPanel: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [category, setCategory] = useState<string>("Order")
    const [actionAdmin, setActionAdmin] = useState<Boolean>(true);

    useEffect(() => {
        dispatch(loadBrands());
        dispatch(loadOrders());
        dispatch(loadProducts());
    }, [actionAdmin]);


    return (
        <div className={styles.adminPanel}>
            <button
                className={classnames(styles.adminPanel__button, styles.adminPanel__button_first)}
                onClick={() => setCategory("Brand")}>Бренд
            </button>
            <button
                className={classnames(styles.adminPanel__button)}
                onClick={() => setCategory("Order")}>Заказы
            </button>
            <button
                className={classnames(styles.adminPanel__button, styles.adminPanel__button_last)}
                onClick={() => setCategory("Product")}>Продукт
            </button>
            {
                category === "Brand" &&
                <div className={styles.adminPanel__brandBlock}>
                    <FormBrandAdd actionAdmin={actionAdmin} setActionAdmin={setActionAdmin}/>
                    <ListBrandAdmin actionAdmin={actionAdmin} setActionAdmin={setActionAdmin}/>
                </div>
            }
            {
                category === "Order" &&
                <div className={styles.adminPanel__productBlock}>
                    <ListOrderAdmin actionAdmin={actionAdmin} setActionAdmin={setActionAdmin}/>
                </div>
            }
            {
                category === "Product" &&
                <div className={styles.adminPanel__productBlock}>
                    <FormProductAdd actionAdmin={actionAdmin} setActionAdmin={setActionAdmin}/>
                    <ListProductAdmin actionAdmin={actionAdmin} setActionAdmin={setActionAdmin}/>
                </div>
            }
        </div>
    );
}

export default AdminPanel;
