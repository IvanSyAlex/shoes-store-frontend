import React, {useState} from "react";
import styles from './styles.module.css';
import {IOrderProductAdmin} from "./types";

const OrderProductAdmin: React.FC<IOrderProductAdmin> = (props): JSX.Element | null => {

    const [count, setCount] = useState<number>(props.purchase[0].count);
    const handlerUpButton = (idProduct: string) => {
        setCount(count + 1);
        props.upCountProductFromPurchase(idProduct, count + 1);
    }
    const handlerDownButton = (idProduct: string) => {
        if(!(count - 1)) return;
        setCount(count - 1);
        props.upCountProductFromPurchase(idProduct, count - 1);
    }

     return(
        <div className={styles.orderProductAdmin}>
            <img src={props.product[0]?.imageUrl} alt={props.product[0]?.imageUrl} className={styles.orderProductAdmin__img}/>
            <h3 className={styles.orderProductAdmin__title}>{props.product[0]?.name}</h3>
            <span className={styles.orderProductAdmin__title}>{props.purchase[0].count ? props.purchase[0].count : 0}</span>
            <button
                className={styles.orderProductAdmin__button}
                onClick={() => props.deleteProductFromList(props.purchase[0].product)}
            >
                Удалить
            </button>
            <button
                className={styles.orderProductAdmin__button}
                onClick={() => handlerUpButton(props.purchase[0].product)}
            >
                Увеличить
            </button>
            <button
                className={styles.orderProductAdmin__button}
                onClick={() => handlerDownButton(props.purchase[0].product)}
            >
                Уменишить
            </button>
        </div>
    );
}

export default OrderProductAdmin;