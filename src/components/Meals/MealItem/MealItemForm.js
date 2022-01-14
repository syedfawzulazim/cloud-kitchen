import React, { useState, useRef } from 'react'
import Input from '../../UI/Input'
import styles from './MealItemForm.module.css'

function MealItemForm(props) {
    const { errorMessage, setErrorMessage } = useState(false);
    const inputRef = useRef();
    const onSubmitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = inputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setErrorMessage(true)
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }

    return (
        <form className={styles.form} onSubmit={onSubmitHandler}>
            <Input
                ref={inputRef}
                label="Amount"
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }}
            />
            <button>+ Add</button>
            {errorMessage && <p>Please enter a valid amount (1-5)</p>}
        </form>
    )
}

export default MealItemForm
