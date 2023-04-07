import React, {useState} from "react";
import styles from "./styles.module.css"
import {useDispatch} from "react-redux";
import FormBrandUpdate from "../../Forms/BrandUpdate/FormBrandUpdate";
import classnames from "classnames";
import {IElementBrand} from "./types";
import {AppDispatch} from "../../../../store/store";
import {deleteBrand} from "../../../../store/brands/thunks/delete-brands";


const ElementBrandAdmin: React.FC<IElementBrand> = (props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [update, setUpdate] = useState<Boolean>(false);

    const remove = async () => {
        await dispatch(deleteBrand(props.brand._id));
        props.setActionAdmin(!props.actionAdmin);
    }

    return (
        <div>
            {update ? <FormBrandUpdate
                    brand={props.brand}
                    setUpdate={setUpdate}
                    actionAdmin={props.actionAdmin}
                    setActionAdmin={props.setActionAdmin}/>
                :
                <div className={styles.elementBrandAdmin}>
                    <div className={styles.elementBrandAdmin__brand}>
                        <h3 key={props.brand._id}>{props.brand.nameBrand}</h3>
                        <img className={styles.elementBrandAdmin__img} src={props.brand.imageUrl}/>
                    </div>
                    <div>
                        <button
                            className={classnames(styles.elementBrandAdmin__button, styles.elementBrandAdmin__button_first)}
                            onClick={() => setUpdate(true)}
                        >Редактировать
                        </button>
                        <button
                            className={classnames(styles.elementBrandAdmin__button, styles.elementBrandAdmin__button_second)}
                            onClick={remove}
                        >Удалить
                        </button>
                    </div>
                </div>}
        </div>
    );
}


export default ElementBrandAdmin;