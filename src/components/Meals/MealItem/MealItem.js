import React, { useContext } from 'react'
import MealItemForm from './MealItemForm';
import styels from './MealItem.module.css'
import CartContext from '../../../store/cart-context';


function MealItem(props) {
    const cartCtx = useContext(CartContext)
    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    }
    return (
        <li className={styels.meal}>
            <div>
                <div> <h3> {props.name} </h3> </div>
                <div className={styels.description}> {props.description} </div>
                <div className={styels.price}> {price} </div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
            </div>
        </li>
    )
}

export default MealItem
