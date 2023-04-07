import {useDispatch, useSelector} from "react-redux";
import {selectBasket} from "../../store/basket/selectors";
import styles from "./styles.module.css";
import {AppDispatch} from "../../store/store";
import basketSlice from "../../store/basket";
import {IProduct} from "../../store/product/types";
import {Link, useParams} from "react-router-dom";
import classnames from "classnames";

const Basket = (): JSX.Element => {
    const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const basket = useSelector(selectBasket);


    const upPurchase = (product: IProduct) =>{
        dispatch(basketSlice.actions.addProductInBasket(product))
    }
    const downPurchase = (product: IProduct) =>{
        dispatch(basketSlice.actions.removeProductFromBasket(product))
    }

    return (
        <div className={styles.basket}>
            <h3 className={styles.basket__title}>Ваши покупки</h3>
            <div className={styles.basket__shoppingList}>
                {basket.map((purchase) =>
                    <div key={purchase.product._id} className={styles.basket__purchase}>
                        <div className={styles.basket__infoPurchase}>
                            <h3 className={styles.basket__nameProduct}>{purchase.product.name}</h3>
                            <img  src={purchase.product.imageUrl} className={styles.basket__img}/>
                            <span className={styles.basket__count}>{`- ${purchase.count} шт.`}</span>
                        </div>
                        <div className={styles.basket__btnPanel}>
                            <button onClick={() => upPurchase(purchase.product)} className={styles.basket__btn}>+</button>
                            <button onClick={() => downPurchase(purchase.product)} className={styles.basket__btn}>-</button>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.basket__controller}>
                <Link to="/order-form" className={classnames(styles.basket__btn, styles.basket__btn_controller)}>Оформит заказ</Link>
                <Link to={`/preview/${id}`} className={classnames(styles.basket__btn, styles.basket__btn_controller, styles.basket__btn_back)}>Назад</Link>
            </div>
        </div>
    );
}

export default Basket;