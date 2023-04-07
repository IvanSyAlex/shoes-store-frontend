import React, {useEffect, useState} from "react";
import {IListOrder} from "./types";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../store/store";
import {loadOrders} from "../../../../store/order/thunk/load-orders";
import {selectOrders} from "../../../../store/order/selectors";
import ElementOrderAdmin from "../../Elements/Order/ElementOrderAdmin";
import styles from "./styles.module.css"

const ListOrderAdmin: React.FC<IListOrder> = ({actionAdmin, setActionAdmin}): JSX.Element => {
    const orders = useSelector((state: RootState) => selectOrders(state));

    return (
        <div className={styles.listOrderAdmin}>
            {orders.map((order) =>
                <ElementOrderAdmin
                    key={order._id}
                    order={order}
                    actionAdmin={actionAdmin}
                    setActionAdmin={setActionAdmin}
                />
            )}
        </div>
    );
}

export default ListOrderAdmin;