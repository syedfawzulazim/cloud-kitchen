import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import CartContext from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon'
import styles from "./HeaderCartButton.module.css"

function HeaderCartButton(props) {

    const cartCtx = useContext(CartContext);
    const [btnBump, setBtnBump] = useState(false);

    const { items } = cartCtx;

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0)

    const buttonClasses = `${styles.button} ${btnBump ? styles.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnBump(true)

        const timer = setTimeout(() => {
            setBtnBump(false)
        }, 300);

        return () => {
            clearTimeout(timer)
        }
    }, [items])


    return (
        <button className={buttonClasses} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span> Your Cart</span>
            <span className={styles.badge}> {numberOfCartItems} </span>
        </button>
    )
}

export default HeaderCartButton
