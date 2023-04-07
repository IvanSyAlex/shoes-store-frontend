import React from 'react';
import {selectBrands} from "../../store/brands/selectors";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {AppDispatch} from "../../store/store";
import {loadBrands} from "../../store/brands/thunks/load-brands";
import styles from "./styles.module.css"
import {FaCaretLeft, FaCaretRight} from "react-icons/fa"
import {Link} from "react-router-dom";


const Brands: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const slider = useRef<HTMLDivElement>(null);
    const [count, setCount] = useState<number>(0);
    const [nameBrandStyle, setNameBrandStyle] = useState<React.CSSProperties>({transform: 'translateX(8em)'});
    const [translateValue, setTransValue] = useState<number>(8);

    useEffect(() => {
        dispatch(loadBrands());
    }, []);
    const brands = useSelector(selectBrands);

    const clickBack = () => {
        if (count !== 0) {
            setTransValue(translateValue + 8);
            setNameBrandStyle({transform: `translateX(${translateValue + 8}em)`});
            setCount(count - 1);
        }
    }

    const clickForward = () => {
        if (count < brands.length - 3) {
            setTransValue(translateValue - 8);
            setNameBrandStyle({transform: `translateX(${translateValue - 8}em)`});
            setCount(count + 1);
        }
    }

    return (
        <div className={styles.brands}>
            <FaCaretLeft onClick={clickBack} className={styles.brands__arrow}/>
            <div className={styles.brands__track} ref={slider}>
                {brands.map((brand) =>
                    <Link to={`/${brand._id}`}
                        key={brand._id}
                         className={styles.brands__name}
                         style={nameBrandStyle}
                    >
                        {brand.nameBrand}
                    </Link>
                )}
            </div>
            <FaCaretRight onClick={clickForward} className={styles.brands__arrow}/>
        </div>

    );
}

export default Brands;