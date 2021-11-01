import { useRef, useState } from "react";

import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
    const [isValid, setIsvalid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim() === "" || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setIsvalid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);

    };

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <Input 
                ref={amountInputRef}
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
            <button>Add +</button>
            {!isValid && <p>Enter a valid amount (1 to 5)</p>}
        </form>
    );
}

export default MealItemForm;