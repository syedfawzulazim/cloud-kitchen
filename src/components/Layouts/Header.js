import React from 'react'
import mealsImage from "../../assets/meals.jpg"
import styles from "./Header.module.css"
import HeaderCartButton from './HeaderCartButton'



function Header(props) {
    return (
        <>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt="Table of food" />
            </div>
        </>
    )
}

export default Header
