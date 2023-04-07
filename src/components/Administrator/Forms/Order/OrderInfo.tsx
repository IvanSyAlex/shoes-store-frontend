import React, {useEffect, useState} from "react";
import styles from "./styles.module.css"
import {IOrderUpdate} from "./types";
import classnames from "classnames";
import {selectListProductsByIds, selectProducts} from "../../../../store/product/selectors";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../store/store";
import OrderProductAdmin from "../../Elements/OrderProductAdmin/OrderProductAdmin";
import {IProduct} from "../../../../store/product/types";
import {updateOrder} from "../../../../store/order/thunk/update-order";
import {IOrder, IPurchase} from "../../../../store/order/types";
import SelectProduct from "./SelectProduct/SelectProduct";
import main from "../../../Main/Main";


const OrderInfo: React.FC<IOrderUpdate> = (props): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();

    const [firstName, setFirstName] = useState<string>(props.order.firstName);
    const [lastName, setLastName] = useState<string>(props.order.lastName);
    const [email, setEmail] = useState<string>(props.order.email);
    const [phone, setPhone] = useState<string>(props.order.phone);
    const [address, setAddress] = useState<string>(props.order.address);
    const [products, setProducts] = useState<(IProduct | undefined)[]>([]);
    const [isSelectProduct, setIsSelectProduct] = useState<boolean>(false);
    const [purchase, setPurchase] = useState<IPurchase[]>(props.order.purchase);
    const [ids, setIds] = useState<string[]>([]);


    useEffect(() => {
        const listIds = purchase.map((purchase) => purchase.product);
        if (listIds){
            setIds(listIds);
        }
    }, [purchase]);

    const allProductsList = useSelector((state: RootState) => selectProducts(state));
    const productsList = useSelector((state: RootState) => selectListProductsByIds(state, ids));

    useEffect(() => {
        setProducts(productsList);
    }, [ids]);

    const upCountProductFromPurchase = (idProduct: string, amount: number) => {
        const newPurchase = purchase.map((item) => {
            if(item.product === idProduct) return {product: item.product, count: amount}
            return item;
        });
        setPurchase(newPurchase);
    }

    const deleteProductFromList = (idProduct: string) => {
        const newPurchase = purchase.filter((item) => item.product !== idProduct);
        setPurchase([...newPurchase]);
    };
    const addProductFromList = (idProduct: string) => {
        const obj = {product: idProduct, count: 1}
        if (purchase.includes(obj)) return
        setPurchase([...purchase, obj]);
    };

    const update = (id: string) => {
        const obj = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            email: email,
            phone: phone,
            purchase: purchase,
        } as IOrder
        dispatch(updateOrder(obj, id));
        props.setActionAdmin(!props.actionAdmin)
        props.setInfoActive(false);
        window.location.reload();
    }


    return (
        <div className={styles.orderInfo}>
            <div className={styles.orderInfo__form}>
                <input
                    type="text"
                    placeholder={props.order.firstName}
                    className={classnames(styles.orderInfo__input)}
                    onChange={(e) => {
                        setFirstName(e.target.value)
                    }}
                />
                <input
                    type="text"
                    placeholder={props.order.lastName}
                    className={classnames(styles.orderInfo__input)}
                    onChange={(e) => {
                        setLastName(e.target.value)
                    }}
                />
                <input
                    type="text"
                    placeholder={props.order.email}
                    className={classnames(styles.orderInfo__input)}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <input
                    type="text"
                    placeholder={props.order.phone}
                    className={classnames(styles.orderInfo__input)}
                    onChange={(e) => {
                        setPhone(e.target.value)
                    }}
                />
                <input
                    type="text"
                    placeholder={props.order.address}
                    className={classnames(styles.orderInfo__input)}
                    onChange={(e) => {
                        setAddress(e.target.value)
                    }}
                />
                <div className={styles.orderInfo__list}>
                    {purchase.map((item) => {
                            return item ?
                                <OrderProductAdmin
                                    key={item.product}
                                    purchase={[item]}
                                    product={products.filter((element) => element?._id === item.product)}
                                    deleteProductFromList={deleteProductFromList}
                                    upCountProductFromPurchase={upCountProductFromPurchase}
                                /> : null
                        }
                    )}
                </div>
                <div className={styles.orderInfo__controller}>
                    <button
                        className={styles.orderInfo__button}
                        onClick={() => setIsSelectProduct(!isSelectProduct)}
                    >
                        Добавить новый товар
                    </button>
                    <button
                        className={styles.orderInfo__button}
                        onClick={() => update(props.order._id)}
                    >
                        Обновить
                    </button>
                    <button
                        className={styles.orderInfo__button}
                        onClick={() => props.setInfoActive(false)}
                    >
                        Назад
                    </button>
                </div>
                {isSelectProduct && <div className={styles.orderInfo__selectList}>
                    {allProductsList.map((product) =>
                        <SelectProduct
                            product={product}
                            addProductFromList={addProductFromList}
                            setIsSelectProduct={setIsSelectProduct}
                        />)}
                </div>}

            </div>
        </div>
    );
}

export default OrderInfo;