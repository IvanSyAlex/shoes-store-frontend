import styles from "./styles.module.css";
import React, {useRef, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {IFromBrandAdd} from "./types";
import {AppDispatch} from "../../../../store/store";
import {addBrand} from "../../../../store/brands/thunks/add-brands";


const FormBrandAdd: React.FC<IFromBrandAdd> = ({actionAdmin, setActionAdmin}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [brand, setBrand] = useState("");
    const [fileImage, setFileImage] = useState<File | null>(null);
    const [img, setImg] = useState<string>("");
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setFileImage(event.target.files[0]);
        setImg(URL.createObjectURL(event.target.files[0]));
    }
    const refresh = () =>{
        setActionAdmin(!actionAdmin);
        setBrand("");
        setImg("");
    }
    const addNewBrand = async () => {
        const formData = new FormData();
        const newBrand = {
            nameBrand: brand,
            imageUrl: `http://localhost:4000/uploads/${fileImage?.name}`
        };
        if (fileImage) {
            formData.append('image', fileImage)
            console.log("Product fileImage >>>", fileImage)
            await axios.post('http://localhost:4000/upload', formData);
            await dispatch(addBrand(newBrand));
            refresh();
        }
    }

    return (
        <div className={styles.formBrandAdd}>
            <input
                type="text"
                name="brand"
                autoComplete="off"
                value={brand}
                placeholder="Название бренда"
                className={styles.formBrandAdd__inputName}
                onChange={(event) => setBrand(event?.currentTarget?.value)}
            />
            <div>
                <input
                    ref={inputFileRef}
                    type="file"
                    onChange={handleChangeFile}
                    hidden
                />
                <button
                    className={styles.formBrandAdd__button}
                    onClick={() => inputFileRef.current?.click()}
                >Загрузить изображение</button>
            </div>
            {img ? <div className={styles.formBrandAdd__img}><img src={img}/></div> : null}
            <button
                className={styles.formBrandAdd__button}
                onClick={addNewBrand}
            >Создать</button>
        </div>
    );
}

export default FormBrandAdd;