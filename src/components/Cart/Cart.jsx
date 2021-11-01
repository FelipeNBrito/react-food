import { useContext } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {

    const cartContext = useContext(CartContext);
    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
    const hasItems = cartContext.totalAmount > 0;
    
    const cartItemRemovedHandler = id => {
        cartContext.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartContext.addItem({...item, amount: 1});
    };

    const cartItems = (
        <ul className={classes['cart-items']}> 
            {cartContext.items.map((item) => {
                return <CartItem 
                    key={item.id} 
                    name={item.name} 
                    price={item.price} 
                    amount={item.amount} 
                    onRemove={cartItemRemovedHandler.bind(null, item.id)} 
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            })}
        </ul>
    );

    if(!cartContext.isShown) {
        return null;
    }
    
    return (
        <Modal onClose={cartContext.hideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>           
            <div className={classes.actions}>
                <button 
                    className={classes['button--alt']}
                    onClick={cartContext.hideCart}
                >
                    Close
                </button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>           
        </Modal>
    );
}

export default Cart;