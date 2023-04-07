import {IProduct} from "../../store/product/types";
import React from "react";
import styles from "./styles.module.css"
import {Link} from "react-router-dom";


const Product: React.FC<IProduct> = (props) => {
    return (
        <Link
            to={`/preview/${props._id}`}className={styles.product}>
            <img className={styles.product__img} src={props.imageUrl} alt={props.imageUrl}/>
            <div className={styles.product__name}>
                <h3 className={styles.product__label}>{props.name}</h3>
                <img className={styles.product__logo} src={props.brand.imageUrl} alt={props.brand.imageUrl} />
            </div>
        </Link>
    );
}


export default Product;