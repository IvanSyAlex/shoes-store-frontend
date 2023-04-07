import React, {useState} from "react";
import styles from "./styles.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {IOrder, IPurchase} from "../../store/order/types";
import {addOrder} from "../../store/order/thunk/add-order";
import {selectBasket} from "../../store/basket/selectors";
import {IBasket} from "../../store/basket/types";
import {Link} from "react-router-dom";


const OrderForm: React.FC = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const [isPermission, setIsPermission] = useState<boolean | undefined>()
    const [firstname, setFirstname] = useState<string | undefined>();
    const [lastname, setLastname] = useState<string | undefined>();
    const [address, setAddress] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [numberPhone, setNumberPhone] = useState<string | undefined>();
    const basket = useSelector((state: RootState) => selectBasket(state));

    const validateName = (event: React.ChangeEvent<HTMLInputElement>, setValue: (name: string) => void) => {
        const regular = /^[a-zA-Z\u0400-\u04FF]+$/;
        if (regular.test(String(event.target.value).toLowerCase())) {
            setValue(event.target.value);
        } else {
            setValue("");
        }
    };

    const validateAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regular = /^[a-zA-Z\u0400-\u04FF0-9 .,-]+$/;
        if (regular.test(String(event.target.value).toLowerCase())) {
            setAddress(event.target.value);
        } else {
            setAddress("");
        }
    };

    const validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regular.test(String(event.target.value).toLowerCase())) {
            setEmail(event.target.value);
        } else {
            setEmail("");
        }
    };

    const validatePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const regular = /^[0-9() ]+$/;
        if (regular.test(String(event.target.value).toLowerCase())) {
            setNumberPhone(event.target.value);
        } else {
            setNumberPhone("");
        }
    };

    const createListPurchasesFromBasket = () => {
        const purchases = basket.reduce((acc: IPurchase[], product: IBasket) => {
            acc.push({product: product.product._id, count: product.count})
            return acc;
        }, []);

        return purchases;
    };

    const checkValidityObjectOrder = (obj: IOrder) => {
        if (obj.email === "" && obj.phone === "") {
            setIsPermission(false);
            return;
        }
        setIsPermission(true);
    };

    const addNewObjectOrder = () => {
        const obj: any = {
            firstName: firstname || "",
            lastName: lastname || "",
            address: address || "",
            email: email || "",
            phone: numberPhone || "",
            purchase: createListPurchasesFromBasket(),
        }
        checkValidityObjectOrder(obj);
        return obj
    };

    const sendNewOrder = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const obj = addNewObjectOrder()
        if (!isPermission) return;
        dispatch(addOrder(obj))
    };

    return (
        <div className={styles.orderForm}>
            <h3 className={styles.orderForm__title}>Форма заказа</h3>
            {isPermission === false && <span className={styles.orderForm__error}>Поля: Имя, Email, Номер телефона обязательны для заполнения</span>}
            <form action="" className={styles.orderForm__form}>
                {firstname === "" && <span className={styles.orderForm__error}>Имя должно содержать только буквы</span>}
                <input onChange={(event) => validateName(event, setFirstname)}
                       className={styles.orderForm__input}
                       placeholder="Имя"
                />
                {lastname === "" &&
                    <span className={styles.orderForm__error}>Фамилия должна содержать только буквы</span>}
                <input onChange={(event) => validateName(event, setLastname)}
                       className={styles.orderForm__input}
                       placeholder="Фамилия"
                />
                {address === "" && <span className={styles.orderForm__error}>Не корректно указан адрес</span>}
                <input onChange={(event) => validateAddress(event)}
                       className={styles.orderForm__input}
                       placeholder="Адрес"
                />
                {email === "" && <span className={styles.orderForm__error}>Не верный E-mail</span>}
                <input onChange={(event) => validateEmail(event)}
                       className={styles.orderForm__input}
                       placeholder="E-mail"
                />
                {numberPhone === "" &&
                    <span className={styles.orderForm__error}>Номер телефона должен состоять только из цифр</span>}
                {numberPhone && numberPhone !== "" && numberPhone?.length < 6 ? <span
                    className={styles.orderForm__error}>Номер телефона должен быть не меньше 6 цифр </span> : null}
                <input onChange={(event) => validatePhone(event)}
                       className={styles.orderForm__input}
                       placeholder="Номер телефона"
                />

                {basket.length ?
                    <div className={styles.orderForm__controller}>
                        <Link to="/" className={styles.orderForm__btn}>На главную </Link>
                        <Link
                            to="/"
                            type="submit"
                            className={styles.orderForm__btn}
                            onClick={(event) => sendNewOrder(event)}
                        >
                            Отправить
                        </Link>
                    </div>
                    // <button
                    //     type="submit"
                    //     className={styles.orderForm__btn}
                    //     onClick={(event) => sendNewOrder(event)}
                    // >
                    //     Отправить
                    // </button>

                    :
                    <Link to="/" className={styles.orderForm__btn}>На главную </Link>
                }
            </form>
        </div>
    );
}


export default OrderForm;