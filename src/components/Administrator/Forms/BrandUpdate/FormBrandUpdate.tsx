import {IBrandUpdate} from "./types";
import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import classnames from "classnames";
import {AppDispatch} from "../../../../store/store";
import {IBrand} from "../../../../store/brands/types";
import {updateBrand} from "../../../../store/brands/thunks/update-brands";
import styles from "./styles.module.css"



const FormBrandUpdate: React.FC<IBrandUpdate> = (props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [img, setImg] = useState<string>(props.brand.imageUrl);
    const [fileImage, setFileImage] = useState<File | null>(null);
    const [brand, setBrand] = useState<string>(props.brand.nameBrand);
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setFileImage(event.target.files[0]);
        setImg(URL.createObjectURL(event.target.files[0]));
    }

    const refresh = () => {
        setImg("");
        setFileImage(null);
        setBrand("");
        props.setActionAdmin(!props.actionAdmin);
    }

    const updateData = async () => {
        const obj: IBrand = {
            _id: props.brand._id,
            nameBrand: brand,
            imageUrl: `http://localhost:4000/uploads/${fileImage?.name}`
        }
        const formData = new FormData();
        if (fileImage) {
            formData.append('image', fileImage)
            await axios.post('http://localhost:4000/upload', formData);
            await dispatch(updateBrand(obj));
            refresh();
            props.setUpdate(false);
        } else {
            refresh();
            props.setUpdate(false);
        }
    }

    return (
        <div className={styles.formBrandUpdate}>
            <input
                type="text"
                value={brand}
                className={styles.formBrandUpdate__input}
                onChange={(event) => setBrand(event?.currentTarget?.value)}
            />
            <input
                type="file"
                ref={inputFileRef}
                hidden
                onChange={handleChangeFile}
            />
            {img !== "" ? <img className={styles.formBrandUpdate__img} src={img}/> : null}
            <button
                className={classnames(styles.formBrandUpdate__button, styles.formBrandUpdate__button_first)}
                onClick={() => inputFileRef.current?.click()}
            >Загрузить изображение
            </button>
            <button
                className={classnames(styles.formBrandUpdate__button, styles.formBrandUpdate__button_second)}
                onClick={updateData}
            >Внести изменения
            </button>
        </div>
    );
}

export default FormBrandUpdate;