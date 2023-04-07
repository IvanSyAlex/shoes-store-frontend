import React, {useRef, useState} from "react";
import styles from "./styles.module.css"
import classnames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {IFromProductAdd} from "./types";
import {AppDispatch} from "../../../../store/store";
import {selectBrands} from "../../../../store/brands/selectors";
import {addProduct} from "../../../../store/product/thunks/add-product";


const FormProductAdd: React.FC<IFromProductAdd> = ({actionAdmin,setActionAdmin}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [nameProduct, setNameProduct] = useState<string>("");
    const [idBrand, setIdBrand] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number| null>(0.0);
    const [img, setImg] = useState<string>("");
    const [fileImage, setFileImage] = useState<File | null>(null);
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const brands = useSelector(selectBrands);


    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setFileImage(event.target.files[0]);
        setImg(URL.createObjectURL(event.target.files[0]));
    }

    const getIdBrand = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const brand = brands.filter((el) => el.nameBrand === event.target.value)[0];
        setIdBrand(brand._id)
    }
    const refresh = () => {
        setNameProduct("");
        setIdBrand("");
        setDescription("");
        setPrice(null);
        setImg("")
        setFileImage(null);
        setActionAdmin(!actionAdmin);

    }

    const addNewProduct = async () => {
        const newProduct = {
            name: nameProduct,
            brand: idBrand,
            imageUrl: `http://localhost:4000/uploads/${fileImage?.name}`,
            description: description,
            price: Number(price),
        };
        const formData = new FormData();
        if (fileImage) {
            formData.append('image', fileImage)
            await axios.post('http://localhost:4000/upload', formData);
            await dispatch(addProduct(newProduct));
            refresh();
        }
    }

    return (
        <div className={styles.formProductAdd}>
            <div className={styles.formProductAdd__info}>
                <input
                    type="text"
                    placeholder= "Название"
                    value={nameProduct}
                    className={classnames(styles.formProductAdd__inputName, styles.formProductAdd_child)}
                    onChange={(e) => {
                        setNameProduct(e.target.value)
                    }}
                />
                <select
                    className={styles.formProductAdd__select}
                    onChange={(e) => getIdBrand(e)}>
                    <option selected>Выбрать бренд</option>
                    {brands.map((brand) => <option key={brand._id}>{brand.nameBrand}</option>)}
                </select>
                <textarea
                    placeholder="Описание"
                    value={description}
                    className={classnames(styles.formProductAdd__description, styles.formProductAdd_child)}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number" min="1" step="any"
                    placeholder ={`0.0 $`}
                    value={price ? price: ""}
                    className={classnames(styles.formProductAdd__price, styles.formProductAdd_child)}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                <input
                    ref={inputFileRef}
                    type="file"
                    onChange={handleChangeFile}
                    hidden
                />
                {img !== "" ? <img className={styles.formProductAdd__img} src={img}/> : null}
                <button
                    className={styles.formProductAdd__button}
                    onClick={() => inputFileRef.current?.click()}
                >Загрузить изображение
                </button>
            </div>
            <div className={styles.formProductAdd__controller}>
                <button
                    className={styles.formProductAdd__button}
                    onClick={addNewProduct}>Создать
                </button>
            </div>
        </div>
    );
}


export default FormProductAdd;