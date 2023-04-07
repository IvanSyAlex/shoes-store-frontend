import styles from "./styles.module.css"
import Brands from "../Brands/Brands";
import ListProduct from "../ListProduct/ListProduct";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {loadBrands} from "../../store/brands/thunks/load-brands";

const Main: React.FC = () => {
    const {brandId}= useParams();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(loadBrands());
        dispatch(loadBrands());
    }, []);

    return(
        <div className={styles.main}>
            <Brands />
            <ListProduct id={brandId}/>
        </div>
    );
}

export default Main;