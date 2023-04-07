import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectProductsById} from "../../store/product/selectors";
import {AppDispatch, RootState} from "../../store/store";
import styles from "./styles.module.css";
import {BsBasket2, BsCurrencyDollar} from "react-icons/bs";
import React, {useEffect, useState} from "react";
import {loadProducts} from "../../store/product/thunks/load-products";
import basketSlice from "../../store/basket";
import {IProduct} from "../../store/product/types";
import {selectBasket, selectBasketAmountProduct} from "../../store/basket/selectors";


const Preview: React.FC = (): JSX.Element => {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const amountProduct = useSelector(selectBasketAmountProduct);
    const [countProductInBasket, setCountProductInBasket] = useState<number>(amountProduct)

    useEffect(() => {
        dispatch(loadProducts())
    }, []);

    const product = useSelector((state: RootState) => selectProductsById(state, params.id));

    const add = (product: IProduct | undefined) => {
        dispatch(basketSlice.actions.addProductInBasket(product))
        setCountProductInBasket(countProductInBasket + 1);
    }

    return (
        <div className={styles.preview}>
            <div className={styles.preview__name}>
                {product?.name}
            </div>
            <div className={styles.preview__info}>
                <div className={styles.preview_product}>
                    <img src={product?.imageUrl} className={styles.preview__imageProduct}/>
                    <div className={styles.preview__brand}>
                        <img src={product?.brand.imageUrl} className={styles.preview__imageBrand}/>
                        <h3 className={styles.preview__brandName}>{product?.brand.nameBrand}</h3>
                    </div>
                </div>
                <p className={styles.preview__description}>{product?.description}</p>
            </div>
            <div className={styles.preview__additional}>

                <h3 className={styles.preview__price}>
                    {`Цена: ${product?.price}`}
                    <BsCurrencyDollar className={styles.preview__iconDollar}/>
                </h3>
            </div>
            <div className={styles.preview__controller}>
                <button
                    onClick={() => add(product)}
                    className={styles.preview__buttonBasket}
                >Добавить в корзину</button>
                <Link to={`/basket/${product?._id}`} className={styles.preview__basketBlock}>
                    {!!countProductInBasket && <div className={styles.preview__countBasket}>{countProductInBasket}</div>}
                    <BsBasket2 className={styles.preview__iconBasket}/>
                </Link>

            </div>
            <Link to="/" className={styles.preview__buttonBack}>Назад</Link>
        </div>
    );
}

export default Preview;