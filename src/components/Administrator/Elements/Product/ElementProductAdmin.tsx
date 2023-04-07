import React, {useState} from "react";
import {useDispatch} from "react-redux";
import FormProductUpdate from "../../Forms/ProductUpdate/FormProductUpdate";
import styles from "./styles.module.css"
import classnames from "classnames";
import {IElementProduct} from "./types";
import {AppDispatch} from "../../../../store/store";
import {deleteProduct} from "../../../../store/product/thunks/delete-product";


const ElementProductAdmin: React.FC<IElementProduct> = (props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [update, setUpdate] = useState<Boolean>(false);

    const remove = async () => {
        await dispatch(deleteProduct(props.product._id));
        props.setActionAdmin(!props.actionAdmin)
    }

    return (
        <div>
            {
                update ? <FormProductUpdate
                        product={{...props.product}}
                        setUpdate={setUpdate}
                        actionAdmin={props.actionAdmin}
                        setActionAdmin={props.setActionAdmin}
                    />
                    :
                    <div className={styles.elementProductAdmin}>
                        <div className={styles.elementProductAdmin__info}>
                            <div className={styles.elementProductAdmin__product}>
                                <h3>{props.product.name}</h3>
                                <img className={styles.elementProductAdmin__img} src={props.product.imageUrl}/>
                            </div>
                            <button
                                className={classnames(styles.elementProductAdmin__button, styles.elementProductAdmin__button_first)}
                                onClick={() => setUpdate(true)}>Редакториовать
                            </button>
                            <button
                                className={classnames(styles.elementProductAdmin__button, styles.elementProductAdmin__button_second)}
                                onClick={remove}>Удалить
                            </button>
                        </div>
                    </div>
            }
        </div>
    );
}


export default ElementProductAdmin;