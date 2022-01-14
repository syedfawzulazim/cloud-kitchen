import React, { useContext } from 'react'
import styles from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'

function Cart(props) {
    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItem = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = item => {
        const cartItem = { ...item, amount: 1 }
        cartCtx.addItem(cartItem)
    }

    const cartItems =
        <ul className={styles['cart-items']}>
            {
                cartCtx.items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        amount={item.amount}
                        price={item.price}
                        onRemove={cartItemRemoveHandler.bind(null, item.id)}
                        onAdd={cartItemAddHandler.bind(null, item)}
                    />
                ))
            }
        </ul>

    return (
        <Modal onHideCart={props.onHideCart}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button-alt']} onClick={props.onHideCart}>Close</button>
                {hasItem && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart
