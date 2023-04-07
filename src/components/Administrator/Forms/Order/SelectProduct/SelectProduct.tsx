import React from "react";
import {ISelectProduct} from "./types";
import styles from "./styles.module.css"

const SelectProduct: React.FC<ISelectProduct> = (props): JSX.Element => {
    const addProduct = (id: string | undefined) => {
        if(!id) return;
        props.addProductFromList(id);
        props.setIsSelectProduct(false)
    }
    return (
        <div className={styles.selectProduct}>
            <img src={props.product?.imageUrl} alt={props.product?.imageUrl} className={styles.selectProduct__img}/>
            <h3 className={styles.selectProduct__title}>{props.product?.name}</h3>
            <button
                className={styles.selectProduct__button}
                onClick={() => addProduct(props.product?._id)}
            >Добавить
            </button>
        </div>
    );
}

export default SelectProduct;