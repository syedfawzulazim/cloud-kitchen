import React, { useContext, useState } from 'react'
import styles from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

function Cart(props) {

    const [isCheakout, setisCheakout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)

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

    const orderHandler = () => {
        setisCheakout(true)
    }
    const onCancelHandler = () => {
        setisCheakout(false)
    }
    const onSubmitOrder = async (userData) => {
        setIsSubmitting(true)
        await fetch('https://foodcart-56fe6-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearItem()
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

    const cartModalContent = (
        <>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheakout && <Checkout onSubmit={onSubmitOrder} onCancel={onCancelHandler} />}
            {!isCheakout && <div className={styles.actions}>
                <button className={styles['button-alt']} onClick={props.onHideCart}>Close</button>
                {hasItem && <button className={styles.button} onClick={orderHandler}>Order</button>}
            </div>}
        </>
    )

    const isSubmittingModalContent = <p>Sending order Data...</p>;
    const didSubmitModalContent = <p>Your Order is Placed</p>;

    return (
        <Modal onHideCart={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart
