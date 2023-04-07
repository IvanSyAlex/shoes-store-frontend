import React from "react";
import styles from "./styles.module.css"


const Wrapper: React.FC<any> = ({children}) => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.wrapper__backgroundBody}>
                <div className={styles.wrapper__top}>
                    <h1 className={styles.wrapper__title}>Shoes</h1>
                    <h1 className={styles.wrapper__title}>Store</h1>
                </div>
                {children}
            </div>
            <div className={styles.wrapper__bottom}></div>
        </div>
    );
}

export default Wrapper;