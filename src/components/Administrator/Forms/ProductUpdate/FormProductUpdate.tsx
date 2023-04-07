import React, {useRef, useState} from "react";
import classnames from "classnames";
import styles from "./styles.module.css";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {IProductUpdate} from "./types";
import {AppDispatch} from "../../../../store/store";
import {IBrand} from "../../../../store/brands/types";
import {selectBrands} from "../../../../store/brands/selectors";
import {IProduct} from "../../../../store/product/types";
import {updateProduct} from "../../../../store/product/thunks/update-product";


const FormProductUpdate: React.FC<IProductUpdate> = (props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [nameProduct, setNameProduct] = useState<string>(props.product.name);
    const [brand, setBrand] = useState<IBrand>(props.product.brand);
    const [description, setDescription] = useState<string>(props.product.description);
    const [price, setPrice] = useState<number | null>(props.product.price);
    const [img, setImg] = useState<string>(props.product.imageUrl);
    const [fileImage, setFileImage] = useState<File | null>(null);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const brands = useSelector(selectBrands);


    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setFileImage(event.target.files[0]);
        setImg(URL.createObjectURL(event.target.files[0]));
    }

    const refresh = () => {
        setNameProduct("");
        setDescription("");
        setPrice(null);
        setImg("")
        setFileImage(null);
        props.setActionAdmin(!props.actionAdmin);
    }

    const getIdBrand = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const brand = brands.filter((el) => el.nameBrand === event.target.value)[0];
        setBrand(brand);
    }

    const update = async () => {
        const obj: IProduct = {
            _id: props.product._id,
            name: nameProduct,
            brand: brand,
            imageUrl: `http://localhost:4000/uploads/${fileImage?.name}`,
            description: description,
            price: Number(price),
        };

        if (fileImage) {
            const formData = new FormData();
            formData.append('image', fileImage)
            await axios.post('http://localhost:4000/upload', formData);
            await dispatch(updateProduct(obj));
            refresh();
            props.setUpdate(false);
        } else {
            refresh();
            props.setUpdate(false);
        }
    }

    return (
        <div className={styles.formProductUpdate}>
            <input
                type="text"
                placeholder={props.product.name}
                className={classnames(styles.formProductUpdate__inputName, styles.formProductUpdate_child)}
                onChange={(e) => {
                    setNameProduct(e.target.value)
                }}
            />
            <select
                className={styles.formProductUpdate__select}
                onChange={(e) => getIdBrand(e)}>
                <option>Выбрать бренд</option>
                {brands.map((brand) => <option key={brand._id}>{brand.nameBrand}</option>)}
            </select>
            <textarea
                placeholder={props.product.description}
                className={classnames(styles.formProductUpdate__description, styles.formProductUpdate_child)}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number" min="1" step="any"
                placeholder={(props.product.price).toString()}
                className={classnames(styles.formProductUpdate__price, styles.formProductUpdate_child)}
                onChange={(e) => setPrice(Number(e.target.value))}
            />
            <input
                ref={inputFileRef}
                type="file"
                onChange={handleChangeFile}
                hidden
            />
            {img !== "" ? <img src={img}/> : null}
            <button
                className={classnames(styles.formProductUpdate__button, styles.formProductUpdate__button_first)}
                onClick={() => inputFileRef.current?.click()}>Загрузить изображение
            </button>
            <button
                className={classnames(styles.formProductUpdate__button, styles.formProductUpdate__button_second)}
                onClick={update}>Внести изменеия
            </button>
        </div>
    );
}


export default FormProductUpdate;