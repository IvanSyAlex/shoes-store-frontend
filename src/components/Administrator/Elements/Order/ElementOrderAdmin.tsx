import {IElementOrder} from "./types";
import React, {useState} from "react";
import styles from "./styles.module.css"
import OrderInfo from "../../Forms/Order/OrderInfo";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../store/store";
import {deleteOrder} from "../../../../store/order/thunk/delete-order";


const ElementOrderAdmin: React.FC<IElementOrder> = (props): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const [infoActive, setInfoActive] = useState(false);
    const deleteAnOrder = (id: string) => {
        dispatch(deleteOrder(id));
        window.location.reload();
    }

    return (
        <>
            {infoActive ?
                <OrderInfo
                    order={props.order}
                    actionAdmin={props.actionAdmin}
                    setInfoActive={setInfoActive}
                    setActionAdmin={props.setActionAdmin}
                />
                :
                <div className={styles.elementOrderAdmin}>
                    <h3 className={styles.elementOrderAdmin__title}>{props.order.firstName}</h3>
                    <span className={styles.elementOrderAdmin__info}>{props.order.date}</span>
                    <span
                        className={styles.elementOrderAdmin__info}> Наименований - {props.order.purchase.length}</span>
                    <button
                        className={styles.elementOrderAdmin__button}
                        onClick={() => setInfoActive(true)}
                    > Информация
                    </button>
                    <button
                        className={styles.elementOrderAdmin__button}
                        onClick={() => deleteAnOrder(props.order._id)}
                    > Удалить
                    </button>
                </div>
            }
        </>

    );
}

export default ElementOrderAdmin;